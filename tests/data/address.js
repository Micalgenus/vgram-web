/**
 * Created by KIMSEONHO on 2016-09-02.
 */
var moment = require('moment');
moment.locale("ko");

//------------------------------------------
// address table
//------------------------------------------
module.exports = [
   {
      ID: 1,
      translation_id: 1,
      coordinate_id: 1,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 1
   },
   {
      ID: 2,
      translation_id: 2,
      coordinate_id: 2,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 2
   },
   {
      ID: 3,
      translation_id: 3,
      coordinate_id: 3,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 3
   },
   {
      ID: 4,
      translation_id: 4,
      coordinate_id: 4,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 4
   },
   {
      ID: 5,
      translation_id: 5,
      coordinate_id: 5,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 5
   },
   {
      ID: 6,
      translation_id: 6,
      coordinate_id: 6,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 6
   },
   {
      ID: 7,
      translation_id: 7,
      coordinate_id: 7,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 7
   },
   {
      ID: 8,
      translation_id: 8,
      coordinate_id: 8,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 8
   },
   {
      ID: 9,
      translation_id: 9,
      coordinate_id: 9,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 9
   },
   {
      ID: 10,
      translation_id: 10,
      coordinate_id: 10,
      post_code: "54922",
      region_code: "4511310500",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 567",
      addr2: "전라북도 전주시 덕진구 금암동 1587-31",
      detail: "전북대학교 창업동아리 아늑한집",
      extra_info: "전북대",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 11,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 11,
      post_code: "54898",
      region_code: "4513013100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 백제대로 563",
      addr2: "전라북도 전주시 덕진구 금암동 668-3",
      detail: "코앞빌딩 5-208호 모빌리티랩",
      extra_info: "항공솔루션센터",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 12,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 12,
      post_code: "54816",
      region_code: "4511312200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 고내천변로 24-65",
      addr2: "전북 전주시 덕진구 송천동2가 779-3",
      detail: "",
      extra_info: "전주천변",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 13,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 13,
      post_code: "54842",
      region_code: "4511313300",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 감수길 10-10",
      addr2: "전북 전주시 덕진구 팔복동4가 209",
      detail: "신전주자동차공업사",
      extra_info: "북전주역근처",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 14,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 14,
      post_code: "54826",
      region_code: "4511312200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 시천로 101",
      addr2: "전북 전주시 덕진구 송천동2가 610-31",
      detail: "삼성 C&C플라자 전주송천점",
      extra_info: "송천동 메가박스 근처",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 15,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 15,
      post_code: "54807",
      region_code: "4511312300",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 반월동 238-6",
      addr2: "전북 전주시 덕진구 혁신로 707",
      detail: "전주반월초등학교",
      extra_info: "",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 16,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 16,
      post_code: "54802",
      region_code: "4511312600",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 전주시 덕진구 성덕동 478",
      addr2: "전북 전주시 덕진구 번영로 230-14",
      detail: "전주자림학교",
      extra_info: "자림성덕헌",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 17,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 17,
      post_code: "54634",
      region_code: "4514012200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 영등동 268-9",
      addr2: "전북 익산시 동서로 309",
      detail: "성모병원",
      extra_info: "성모성모",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 18,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 18,
      post_code: "54634",
      region_code: "4514012200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 영등동 337-5",
      addr2: "전북 익산시 동서로35길 41",
      detail: "남성중학교",
      extra_info: "남성여고 옆",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 19,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 19,
      post_code: "54535",
      region_code: "4514012000",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 신용동 613-1",
      addr2: "전북 익산시 석상길 21-40",
      detail: "마동공원",
      extra_info: "양아치많음 ㅋㅋ",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 20,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 20,
      post_code: "54535",
      region_code: "4514011900",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 현영동 95-2",
      addr2: "전북 익산시 무왕로 779-26 (가나안자동차운전학원)",
      detail: "가나안자동차운전학원 교무실",
      extra_info: "강사들이 별로 ㅋㅋㅋㅋ",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 21,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 21,
      post_code: "54535",
      region_code: "4514012000",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 신용동 235-1",
      addr2: "전북 익산시 익산대로33길 75",
      detail: "수양의집 사무실",
      extra_info: "원광요양원",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 22,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 22,
      post_code: "54535",
      region_code: "4514013200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 임상동 355",
      addr2: "전북 익산시 오동길 50",
      detail: "리라자연유치원",
      extra_info: "삼성동",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 23,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 23,
      post_code: "54531",
      region_code: "4514013200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 월성동 304-9",
      addr2: "전북 익산시 하나로15길 179-25",
      detail: "전북원종장",
      extra_info: "전북농업기술원 종자사업소",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 24,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 23,
      post_code: "54531",
      region_code: "4514013200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 월성동 304-9",
      addr2: "전북 익산시 하나로15길 179-25",
      detail: "전북원종장",
      extra_info: "전북농업기술원 종자사업소",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 25,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 25,
      post_code: "54531",
      region_code: "4514032022",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 익산시 황등면 동연리 883-24",
      addr2: "전북 익산시 황등면 동연길 73-15",
      detail: "황등남초등학교 3학년 2반",
      extra_info: "황등초등학교",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 26,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 26,
      post_code: "54085",
      region_code: "4513014200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 군산시 미장동 56-107",
      addr2: "전북 군산시 미장안길 14",
      detail: "미장초등학교",
      extra_info: "하악하악",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 27,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 27,
      post_code: "54086",
      region_code: "4513014200",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 군산시 미장동 473",
      addr2: "전북 군산시 경포천로 66 (수송공원 삼성쉐르빌)",
      detail: "삼성쉐르빌아파트 101호 101호",
      extra_info: "수송동",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 28,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 28,
      post_code: "54102",
      region_code: "4513014100",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 군산시 수송동 703",
      addr2: "전북 군산시 남수송5길 39 (군산실내배드민턴장)",
      detail: "군산실내배드민턴장",
      extra_info: "수송동",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 29,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 29,
      post_code: "54081",
      region_code: "4513013300",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 군산시 서흥남동 825-29",
      addr2: "전북 군산시 팔마로 114-1",
      detail: "새나라교회 앞 아늑한원룸",
      extra_info: "아늑한집에서 시공한 1호 원룸",
      locale: "ko-kr",
      translation_group_id: 10
   },
   {
      ID: 30,
      translation_id: 10,     // 하나의 게시글에 하나 이상의 좌표가 존재할 수 있음
      coordinate_id: 30,
      post_code: "54121",
      region_code: "4513013300",    // https://www.code.go.kr/jsp/stdcode/regCodeL.jsp
      addr1: "전북 군산시 서흥남동 798-39",
      addr2: "전북 군산시 동리2길 20",
      detail: "아늑한원룸 2호 208호",
      extra_info: "아늑한집에서 시공한 2호 원룸",
      locale: "ko-kr",
      translation_group_id: 10
   }
]
