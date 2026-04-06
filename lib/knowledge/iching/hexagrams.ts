/**
 * I Ching (Kinh Dịch) - 64 Hexagrams Knowledge Base
 * Source: Kinh Dịch Trọn Bộ - Ngô Tất Tố (Dịch và chú giải)
 *
 * Each hexagram contains:
 * - number: 1-64
 * - name: Vietnamese name with Chinese characters
 * - lines: Array of 6 lines (1 = yang/solid, 0 = yin/broken), bottom to top
 * - judgment: Overall meaning/fortune
 * - image: Symbolic representation
 * - lineTexts: Interpretations for each line
 * - advice: Practical guidance
 */

export interface HexagramKnowledge {
  number: number;
  name: string;
  chineseName: string;
  lines: number[];
  judgment: string;
  image: string;
  lineTexts: string[];
  advice: string[];
  upperTrigram: string;
  lowerTrigram: string;
}

export const HEXAGRAMS: HexagramKnowledge[] = [
  {
    number: 1,
    name: "Kiền - Trời (Thuần Kiền)",
    chineseName: "乾為天",
    lines: [1, 1, 1, 1, 1, 1],
    judgment: "Nguyên Hanh Lợi Trinh - Đại hanh thông, lợi về sự chính bền",
    image: "Trời vận hành mạnh mẽ, quân tử tự cường bất tức",
    upperTrigram: "Kiền (Trời)",
    lowerTrigram: "Kiền (Trời)",
    lineTexts: [
      "Sơ Cửu: Tiềm long vật dụng - Rồng còn ẩn, chưa nên hành động",
      "Cửu Nhị: Hiện long tại điền, lợi kiến đại nhân - Rồng hiện trên ruộng, nên gặp đại nhân",
      "Cửu Tam: Quân tử chung nhật càn càn... - Quân tử suốt ngày chăm chắng, thận trọng",
      "Cửu Tứ: Hoặc dược tại uyên, vô cữu - Hoặc nhảy lên vực, không lỗi",
      "Cửu Ngũ: Phi long tại thiên, lợi kiến đại nhân - Rồng bay trên trời, nên gặp đại nhân",
      "Thượng Cửu: Kháng long hữu hối - Rồng lên cao quá, sẽ có hối hận"
    ],
    advice: [
      "Phát huy nội lực, tự cường không ngừng",
      "Biết thời biết thế, không nên hành động vội vàng",
      "Giữ vững chính đạo, kiên trì đến cùng"
    ]
  },
  {
    number: 2,
    name: "Khôn - Đất (Thuần Khôn)",
    chineseName: "坤為地",
    lines: [0, 0, 0, 0, 0, 0],
    judgment: "Nguyên Hanh, lợi tẫn mã chi trinh - Hanh thông, lợi về đức tính bền bỉ của ngựa cái",
    image: "Đất dày chở vật, quân tử hậu đức tải vật",
    upperTrigram: "Khôn (Đất)",
    lowerTrigram: "Khôn (Đất)",
    lineTexts: [
      "Sơ Lục: Lý sương, kiên băng chí - Giẫm lên sương, biết băng cứng sắp đến",
      "Lục Nhị: Trực phương đại, bất tập vô bất lợi - Ngay thẳng, vuông vức, lớn, không luyện tập cũng không gì không lợi",
      "Lục Tam: Hàm chương khả trinh - Ngậm giữ đức tốt, giữ chính",
      "Lục Tứ: Khoáng nang, vô cữu vô dự - Túi vải vàng, không lỗi không danh",
      "Lục Ngũ: Hoàng thường, nguyên cát - Áo vàng, rất tốt",
      "Thượng Lục: Long chiến vu dã, kỳ huyết huyền hoàng - Rồng đánh nhau ở đồng, máu đen vàng chảy ra"
    ],
    advice: [
      "Nhu thuận, bao dung, chở vật",
      "Giữ đức tính nhu hòa, không tranh giành",
      "Hỗ trợ người khác thành công"
    ]
  },
  {
    number: 3,
    name: "Truân - Khó khăn ban đầu",
    chineseName: "水雷屯",
    lines: [1, 0, 0, 0, 1, 0],
    judgment: "Nguyên Hanh Lợi Trinh, vật dụng hữu du vãng, lợi kiến hầu - Hanh thông, không nên đi xa, nên lập chư hầu",
    image: "Mây sấm giao nhau, quân tử kinh luân - Mưu đồ sự nghiệp",
    upperTrigram: "Khảm (Nước)",
    lowerTrigram: "Chấn (Sấm)",
    lineTexts: [
      "Sơ Cửu: Bàn hoàn, lợi cư trinh, lợi kiến hầu - Lừng chừng, nên ở chính, nên lập chư hầu",
      "Lục Nhị: Truân như triễn như, thừa mã ban như - Khó khăn trở lại, cưỡi ngựa muốn đi",
      "Lục Tam: Tức lộc vô ngu, duy nhập vu lâm - Đuổi hươu không có người dẫn, chỉ vào rừng",
      "Lục Tứ: Thừa mã ban như, cầu hôn cấu cát - Cưỡi ngựa muốn đi, cầu hôn thì tốt",
      "Cửu Ngũ: Truân kỳ cao, tiểu cát, trinh hung - Khó khăn nhỏ, chút tốt, chính thì hung",
      "Thượng Lục: Thừa mã ban như, khấp huyết liên như - Cưỡi ngựa muốn đi, khóc ra máu"
    ],
    advice: [
      "Khó khăn ban đầu là bình thường",
      "Xây dựng nền móng vững chắc",
      "Tìm người hỗ trợ, không nên đơn độc"
    ]
  },
  {
    number: 4,
    name: "Mông - Mông muội, học tập",
    chineseName: "山水蒙",
    lines: [0, 1, 0, 0, 0, 1],
    judgment: "Phi ngã cầu đồng mông, đồng mông cầu ngã - Không phải ta cầu người học, người học cầu ta",
    image: "Suối dưới núi, quân tử quả dục đức - Nuôi dưỡng đức hạnh",
    upperTrigram: "Cấn (Núi)",
    lowerTrigram: "Khảm (Nước)",
    lineTexts: [
      "Sơ Cửu: Phát mông, dụng hình nhân, hữu cữu - Mở mang người mông muội, dùng hình phạt",
      "Cửu Nhị: Bao mông, cát, nạp phụ cát, khắc gia - Bao bọc người mông muội, tốt",
      "Lục Tam: Vật dụng thủ nữ, kiến kim phu, vô du lợi - Đừng lấy con gái, thấy trai thì không lợi",
      "Lục Tứ: Khốn mông, lận - Khốn vì mông muội, đáng tiếc",
      "Lục Ngũ: Đồng mông, cát - Trẻ thơ mông muội, tốt",
      "Thượng Cửu: Kích mông, bất lợi vi khấu, lợi ngự khấu - Đánh mông muội, không lợi làm giặc, lợi chống giặc"
    ],
    advice: [
      "Khiêm tốn học hỏi từ thầy giỏi",
      "Giáo dục cần kiên nhẫn, bao dung",
      "Học đi đôi với hành"
    ]
  },
  {
    number: 5,
    name: "Nhu - Chờ đợi",
    chineseName: "水天需",
    lines: [1, 1, 1, 0, 0, 1],
    judgment: "Hữu phu, quang hanh, trinh cát, lợi thiệp đại xuyên - Có lòng tin, hanh thông, tốt, lợi vượt sông lớn",
    image: "Mây lên trời, quân tử ẩm thực yến lạc - Ăn uống vui vẻ chờ thời",
    upperTrigram: "Khảm (Nước)",
    lowerTrigram: "Kiền (Trời)",
    lineTexts: [
      "Sơ Cửu: Nhu vu giao, lợi dụng hằng, vô cữu - Chờ ở ngoài, nên giữ thường, không lỗi",
      "Cửu Nhị: Nhu vu sa, tiểu hữu ngôn, chung cát - Chờ ở bãi cát, có lời nhỏ, cuối tốt",
      "Cửu Tam: Nhu vu nê, trí khấu chí - Chờ ở bùn, giặc đến",
      "Lục Tứ: Nhu vu huyết, xuất tự huyệt - Chờ ở máu, ra từ hang",
      "Cửu Ngũ: Nhu vu tửu thực, trinh cát - Chờ ở rượu thịt, chính tốt",
      "Thượng Lục: Nhập vu huyệt, hữu bất tốc chi khách, tam nhân lai, kính chi chung cát - Vào hang, có khách không mời, ba người đến, kính thì tốt"
    ],
    advice: [
      "Kiên nhẫn chờ đợi thời cơ",
      "Giữ vững lòng tin trong lúc chờ",
      "Chuẩn bị sẵn sàng khi cơ hội đến"
    ]
  },
  {
    number: 6,
    name: "Tụng - Tranh tụng, xung đột",
    chineseName: "天水訟",
    lines: [0, 1, 1, 1, 0, 1],
    judgment: "Hữu phu trất, đình trung, chung hung, lợi kiến đại nhân, bất lợi thiệp đại xuyên - Có lòng tin bị ngăn, giữa tốt cuối hung, nên gặp đại nhân",
    image: "Trời nước ngược nhau, quân tử thận trọng mưu sự - Khởi sự cẩn thận",
    upperTrigram: "Kiền (Trời)",
    lowerTrigram: "Khảm (Nước)",
    lineTexts: [
      "Sơ Lục: Bất vĩnh sở sự, tiểu hữu ngôn, chung cát - Không bền việc, có lời nhỏ, cuối tốt",
      "Cửu Nhị: Bất khắc tụng, quy nhi逋, kỳ ấp nhân tam bách hộ, vô cữu - Thua kiện, về trốn, ba trăm hộ không lỗi",
      "Lục Tam: Thực cựu đức, trinh, lệ, chung cát, hoặc tòng vương sự, vô thành - Ăn đức cũ, chính nguy, cuối tốt, theo việc vua không thành",
      "Cửu Tứ: Bất khắc tụng, phục tức mệnh, du an, trinh cát - Thua kiện, về theo mệnh, yên ổn, chính tốt",
      "Cửu Ngũ: Tùng, nguyên cát - Kiện, rất tốt",
      "Thượng Cửu: Hoặc tích chi bàn đái, chung triêu tam thác chi - Hoặc được đai, sáng ra chiều mất"
    ],
    advice: [
      "Tránh tranh tụng, tìm hòa giải",
      "Biết dừng đúng lúc",
      "Tìm người trung gian phân xử"
    ]
  },
  {
    number: 7,
    name: "Sư - Quân đội, chúng",
    chineseName: "地水師",
    lines: [0, 1, 0, 0, 0, 0],
    judgment: "Trinh, trượng nhân cát, vô cữu - Chính, người chính trực tốt, không lỗi",
    image: "Nước trong đất, quân tử dung dân súc chúng - Chứa nuôi dân chúng",
    upperTrigram: "Khôn (Đất)",
    lowerTrigram: "Khảm (Nước)",
    lineTexts: [
      "Sơ Lục: Sư xuất dĩ luật, phủ phủ, hung - Quân ra có luật, không tốt thì hung",
      "Cửu Nhị: Tại sư trung, cát, vô cữu, vương tam tích mệnh - Ở giữa quân, tốt, vua ba lần ban mệnh",
      "Lục Tam: Sư hoặc dư thi, hung - Quân chở thây, hung",
      "Lục Tứ: Sư tả thứ, vô cữu - Quân lùi, không lỗi",
      "Lục Ngũ: Điền hữu cầm, lợi chấp ngôn, vô cữu, trưởng tử soái sư... - Đồng có chim, nên bắt, không lỗi",
      "Thượng Lục: Đại quân hữu mệnh, khai quốc thừa gia, tiểu nhân vật dụng - Đại quân có mệnh, mở nước, tiểu nhân không nên dùng"
    ],
    advice: [
      "Tổ chức có kỷ luật",
      "Lãnh đạo chính trực, có uy",
      "Dụng người đúng, tránh tiểu nhân"
    ]
  },
  {
    number: 8,
    name: "Tỷ - Đoàn kết, gần gũi",
    chineseName: "水地比",
    lines: [0, 0, 0, 0, 1, 0],
    judgment: "Cát, nguyên phệ, nguyên vĩnh trinh, vô cữu, bất ninh phương lai, hậu phu hung - Tốt, xem bói, không yên thì đến, sau thì hung",
    image: "Nước trên đất, quân tử kiến vạn quốc, thân chư hầu - Xây dựng vạn nước, thân chư hầu",
    upperTrigram: "Khảm (Nước)",
    lowerTrigram: "Khôn (Đất)",
    lineTexts: [
      "Sơ Lục: Hữu phu tỷ chi, vô cữu, hữu phu doanh phẫu, chung lai hữu tha cát - Có lòng tin gần gũi, không lỗi",
      "Lục Nhị: Tỷ chi tự nội, trinh cát - Gần gũi từ trong, chính tốt",
      "Lục Tam: Tỷ chi phi nhân - Gần gũi không phải người",
      "Lục Tứ: Tỷ chi ngoại, trinh cát - Gần gũi bên ngoài, chính tốt",
      "Cửu Ngũ: Hiển tỷ, vương dụng tam khu, thất tiền cầm, ấp nhân bất giới, cát - Rõ gần gũi, vua dùng ba lần đuổi",
      "Thượng Lục: Tỷ chi vô thủ, hung - Gần gũi không đầu, hung"
    ],
    advice: [
      "Xây dựng quan hệ chân thành",
      "Đoàn kết nội bộ trước",
      "Chọn người đáng tin để hợp tác"
    ]
  },
  {
    number: 9,
    name: "Tiểu Súc - Tích lũy nhỏ",
    chineseName: "風天小畜",
    lines: [1, 1, 1, 0, 1, 1],
    judgment: "Han mật bất vũ, tự ngã tây giao - Mây dày không mưa, từ tây giao ta",
    image: "Gió trên trời, quân tử văn đức - Trau dồi đức văn",
    upperTrigram: "Tốn (Gió)",
    lowerTrigram: "Kiền (Trời)",
    lineTexts: [
      "Sơ Cửu: Phục tự đạo, kỳ hà kỳ cữu, cát - Trở về đạo, còn gì lỗi, tốt",
      "Cửu Nhị: Khiên phục, cát - Dẫn trở lại, tốt",
      "Cửu Tam: Dư thuyết phúc, phu thê phản mục - Xe gãy trục, vợ chồng trái mắt",
      "Lục Tứ: Hữu phu, huyết khứ xuất, vô cữu - Có lòng tin, máu đi ra, không lỗi",
      "Cửu Ngũ: Hữu phu loan như, phú dĩ kỳ lân - Có lòng tin, giàu cùng xóm",
      "Thượng Cửu: Ký vũ ký xứ, thượng đức tải, phụ nữ lệ, nguyệt ký vọng, quân tử chinh hung - Mưa tạnh, đức chở, đàn bà nguy, trăng tròn, quân tử đi hung"
    ],
    advice: [
      "Tích lũy từng nhỏ một",
      "Kiên trì không nản",
      "Dùng nhu khắc cương"
    ]
  },
  {
    number: 10,
    name: "Lý - Dẫm lên, lễ",
    chineseName: "天澤履",
    lines: [1, 1, 0, 1, 1, 1],
    judgment: "Lý hổ vĩ, bất điệt nhân, hanh - Dẫm đuôi hổ, không cắn, hanh thông",
    image: "Trời trên đầm, quân tử biện thượng hạ - Phân biệt trên dưới",
    upperTrigram: "Kiền (Trời)",
    lowerTrigram: "Đoài (Đầm)",
    lineTexts: [
      "Sơ Cửu: Tố lý, vãng vô cữu - Dẫm thuần chất, đi không lỗi",
      "Cửu Nhị: Lý đạo thản thản, u nhân trinh cát - Dẫm đường bằng, người ẩn chính tốt",
      "Lục Tam: Miểu năng thị, bỉ năng lý, lý hổ vĩ, điệt nhân, hung, vũ nhân vi vu đại quân - Mắt kém thấy, chân què dẫm, hổ cắn, hung",
      "Cửu Tứ: Lý hổ vĩ, tố tố, chung cát - Dẫm đuôi hổ, sợ sợ, cuối tốt",
      "Cửu Ngũ: Quái lý, trinh lệ - Quyết dẫm, chính nguy",
      "Thượng Cửu: Thị lý khảo tường, kỳ toàn nguyên cát - Xem dẫm xét kỹ, toàn rất tốt"
    ],
    advice: [
      "Cẩn thận trong hành động",
      "Giữ lễ nghĩa, phân biệt trên dưới",
      "Biết lo sợ thì tránh được nguy"
    ]
  }
];

// Continue with remaining hexagrams (11-64) in next file due to size...

/**
 * Quick lookup by number
 */
export function getHexagramByNumber(number: number): HexagramKnowledge | undefined {
  return HEXAGRAMS.find(h => h.number === number);
}

/**
 * Quick lookup by name
 */
export function getHexagramByName(name: string): HexagramKnowledge | undefined {
  return HEXAGRAMS.find(h => h.name.toLowerCase().includes(name.toLowerCase()));
}

/**
 * Get hexagram by line pattern
 */
export function getHexagramByLines(lines: number[]): HexagramKnowledge | undefined {
  return HEXAGRAMS.find(h => JSON.stringify(h.lines) === JSON.stringify(lines));
}
