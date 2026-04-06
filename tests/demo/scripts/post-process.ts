/**
 * Video Post-Processing Script
 * Adds overlays, bumper, and compresses videos for web delivery
 *
 * Usage:
 *   npx ts-node tests/demo/scripts/post-process.ts
 *   npx ts-node tests/demo/scripts/post-process.ts --video=onboarding
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const RAW_DIR = path.join(process.cwd(), 'public/videos/raw');
const FINAL_DIR = path.join(process.cwd(), 'public/videos/final');
const ASSETS_DIR = path.join(process.cwd(), 'tests/demo/assets');

// Video processing settings
const SETTINGS = {
  introDuration: 3, // seconds
  outroDuration: 3, // seconds
  targetBitrate: '6M',
  targetWidth: 1920,
  targetHeight: 1080,
  crf: 23, // Quality (lower = better, 18-28)
};

interface ProcessOptions {
  video?: string;
  addOverlay?: boolean;
  compress?: boolean;
  addBumper?: boolean;
}

/**
 * Ensure output directories exist
 */
function ensureDirectories() {
  [RAW_DIR, FINAL_DIR, ASSETS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

/**
 * Get list of raw video files
 */
function getRawVideos(videoId?: string): string[] {
  const files = fs.readdirSync(RAW_DIR);
  const pattern = videoId ? new RegExp(`^${videoId}-.*\\.mp4$`) : /\.mp4$/;
  return files.filter(f => pattern.test(f));
}

/**
 * Add text overlay to video using ffmpeg
 */
async function addTextOverlay(
  inputPath: string,
  outputPath: string,
  text: string,
  options: {
    startTime?: number;
    duration?: number;
    position?: 'top' | 'bottom' | 'center';
    fontSize?: number;
    fontColor?: string;
  } = {}
): Promise<void> {
  const {
    startTime = 0,
    duration = 3,
    position = 'top',
    fontSize = 24,
    fontColor = 'white',
  } = options;

  const yPosition = position === 'top' ? '50' : position === 'bottom' ? 'h-50' : 'h/2';

  const drawText = `drawtext=text='${text}':fontsize=${fontSize}:fontcolor=${fontColor}:x=(w-text_w)/2:y=${yPosition}:shadowcolor=black:shadowx=2:shadowy=2`;

  const cmd = `ffmpeg -i "${inputPath}" -vf "${drawText}" -c:a copy "${outputPath}"`;

  console.log(`🎬 Adding overlay: ${text}`);
  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Add intro bumper to video
 */
async function addIntroBumper(
  inputPath: string,
  outputPath: string,
  title: string
): Promise<void> {
  const introPath = path.join(ASSETS_DIR, 'intro.mp4');

  // Check if intro exists
  if (!fs.existsSync(introPath)) {
    console.log('⚠️ Intro bumper not found, skipping...');
    fs.copyFileSync(inputPath, outputPath);
    return;
  }

  console.log(`🎬 Adding intro bumper...`);
  const cmd = `ffmpeg -i "${introPath}" -i "${inputPath}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" -map "[outv]" -c:a copy "${outputPath}"`;
  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Add outro bumper to video
 */
async function addOutroBumper(
  inputPath: string,
  outputPath: string
): Promise<void> {
  const outroPath = path.join(ASSETS_DIR, 'outro.mp4');

  // Check if outro exists
  if (!fs.existsSync(outroPath)) {
    console.log('⚠️ Outro bumper not found, skipping...');
    fs.copyFileSync(inputPath, outputPath);
    return;
  }

  console.log(`🎬 Adding outro bumper...`);
  const cmd = `ffmpeg -i "${inputPath}" -i "${outroPath}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[outv]" -map "[outv]" -c:a copy "${outputPath}"`;
  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Compress video for web delivery
 */
async function compressVideo(
  inputPath: string,
  outputPath: string,
  options: {
    bitrate?: string;
    crf?: number;
    maxWidth?: number;
    maxHeight?: number;
  } = {}
): Promise<void> {
  const {
    bitrate = SETTINGS.targetBitrate,
    crf = SETTINGS.crf,
    maxWidth = SETTINGS.targetWidth,
    maxHeight = SETTINGS.targetHeight,
  } = options;

  console.log(`📦 Compressing video (CRF: ${crf}, Bitrate: ${bitrate})...`);

  const cmd = `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${crf} -b:v ${bitrate} -maxrate ${bitrate} -bufsize ${parseInt(bitrate) * 2}M -vf "scale='min(${maxWidth},iw)':'min(${maxHeight},ih)':force_original_aspect_ratio=decrease" -c:a aac -b:a 128k "${outputPath}"`;

  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Create intro bumper (placeholder - would need actual design)
 */
async function createIntroBumper(title: string, outputPath: string): Promise<void> {
  // This is a placeholder - in production, you'd use proper video assets
  // For now, create a simple colored frame with text

  const cmd = `ffmpeg -f lavfi -i color=c=black:s=${SETTINGS.targetWidth}x${SETTINGS.targetHeight}:d=${SETTINGS.introDuration} -vf "drawtext=text='${title}':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" -c:v libx264 "${outputPath}"`;

  console.log(`🎬 Creating intro bumper: ${title}`);
  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Create outro bumper (placeholder)
 */
async function createOutroBumper(outputPath: string): Promise<void> {
  // Placeholder for outro bumper
  const cmd = `ffmpeg -f lavfi -i color=c=black:s=${SETTINGS.targetWidth}x${SETTINGS.targetHeight}:d=${SETTINGS.outroDuration} -vf "drawtext=text='lunar.lqduong.dev':fontsize=36:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2" -c:v libx264 "${outputPath}"`;

  console.log(`🎬 Creating outro bumper`);
  execSync(cmd, { stdio: 'inherit' });
}

/**
 * Process a single video
 */
async function processVideo(
  filename: string,
  options: ProcessOptions
): Promise<void> {
  console.log(`\n📹 Processing: ${filename}`);

  const baseName = filename.replace('.mp4', '');
  const inputPath = path.join(RAW_DIR, filename);
  let currentPath = inputPath;
  let step = 0;

  // Step 1: Add overlays
  if (options.addOverlay) {
    const overlayPath = path.join(FINAL_DIR, `${baseName}-overlay.mp4`);
    // Would add text overlays here based on storyboard
    // For now, just copy
    fs.copyFileSync(currentPath, overlayPath);
    currentPath = overlayPath;
    step++;
  }

  // Step 2: Add bumpers
  if (options.addBumper) {
    // Create bumpers if they don't exist
    const introPath = path.join(ASSETS_DIR, 'intro.mp4');
    const outroPath = path.join(ASSETS_DIR, 'outro.mp4');

    if (!fs.existsSync(introPath)) {
      await createIntroBumper('Lunar Mystic', introPath);
    }
    if (!fs.existsSync(outroPath)) {
      await createOutroBumper(outroPath);
    }

    const bumperPath = path.join(FINAL_DIR, `${baseName}-bumper.mp4`);

    // Add intro
    await addIntroBumper(currentPath, bumperPath, 'Lunar Mystic');
    currentPath = bumperPath;

    // Add outro
    const finalBumperPath = path.join(FINAL_DIR, `${baseName}-final.mp4`);
    await addOutroBumper(currentPath, finalBumperPath);
    currentPath = finalBumperPath;
    step++;
  }

  // Step 3: Compress
  if (options.compress) {
    const compressedPath = path.join(FINAL_DIR, `${baseName}.mp4`);
    await compressVideo(currentPath, compressedPath);
    currentPath = compressedPath;
    step++;
  }

  // Move to final location
  const finalPath = path.join(FINAL_DIR, filename);
  if (currentPath !== finalPath) {
    fs.copyFileSync(currentPath, finalPath);
  }

  // Get file size
  const stats = fs.statSync(finalPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`✅ Completed: ${filename} (${sizeMB} MB)`);
}

/**
 * Main processing function
 */
async function main() {
  const args = process.argv.slice(2);
  const videoId = args.find(a => a.startsWith('--video='))?.split('=')[1];

  const options: ProcessOptions = {
    video: videoId,
    addOverlay: true,
    compress: true,
    addBumper: true,
  };

  ensureDirectories();

  const videos = getRawVideos(videoId);

  if (videos.length === 0) {
    console.log('⚠️ No raw videos found in', RAW_DIR);
    console.log('Run record-demo.ts first to generate videos.');
    process.exit(0);
  }

  console.log(`\n🎬 Processing ${videos.length} video(s)...\n`);

  for (const video of videos) {
    await processVideo(video, options);
  }

  console.log('\n✅ All videos processed!');
  console.log(`📁 Output: ${FINAL_DIR}`);
}

main();