import React, { useState } from "react";

type sigunguList = {
  [key : number] : any
  }
export const sigunguList :sigunguList = {
  1: [
    {
      id: 1,
      code: 1,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gangnam-gu",
    },
    {
      id: 2,
      code: 2,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gangdong-gu",
    },
    {
      id: 3,
      code: 3,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gangbuk-gu",
    },
    {
      id: 4,
      code: 4,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gangseo-gu",
    },
    {
      id: 5,
      code: 5,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gwanak-gu",
    },
    {
      id: 6,
      code: 6,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Gwangjin-gu",
    },
    {
      id: 7,
      code: 7,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Guro-gu",
    },
    {
      id: 8,
      code: 8,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Geumcheon-gu",
    },
    {
      id: 9,
      code: 9,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Nowon-gu",
    },
    {
      id: 10,
      code: 10,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Dobong-gu",
    },
    {
      id: 11,
      code: 11,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Dongdaemun-gu",
    },
    {
      id: 12,
      code: 12,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Dongjak-gu",
    },
    {
      id: 13,
      code: 13,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Mapo-gu",
    },
    {
      id: 14,
      code: 14,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Seodaemun-gu",
    },
    {
      id: 15,
      code: 15,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Seocho-gu",
    },
    {
      id: 16,
      code: 16,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Seongdong-gu",
    },
    {
      id: 17,
      code: 17,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Seongbuk-gu",
    },
    {
      id: 18,
      code: 18,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Songpa-gu",
    },
    {
      id: 19,
      code: 19,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Yangcheon-gu",
    },
    {
      id: 20,
      code: 20,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Yeongdeungpo-gu",
    },
    {
      id: 21,
      code: 21,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Yongsan-gu",
    },
    {
      id: 22,
      code: 22,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Eunpyeong-gu",
    },
    {
      id: 23,
      code: 23,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Jongno-gu",
    },
    {
      id: 24,
      code: 24,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Jung-gu",
    },
    {
      id: 25,
      code: 25,
      areaCode: {
        code: 1,
        name: "Seoul",
      },
      name: "Jungnang-gu",
    },
  ],
  2: [
    {
      id: 26,
      code: 1,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Ganghwa-gun",
    },
    {
      id: 27,
      code: 2,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Gyeyang-gu",
    },
    {
      id: 28,
      code: 3,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Michuhol-gu",
    },
    {
      id: 29,
      code: 4,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Namdong-gu",
    },
    {
      id: 30,
      code: 5,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Dong-gu",
    },
    {
      id: 31,
      code: 6,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Bupyeong-gu",
    },
    {
      id: 32,
      code: 7,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Seo-gu",
    },
    {
      id: 33,
      code: 8,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Yeonsu-gu",
    },
    {
      id: 34,
      code: 9,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Ongjin-gun",
    },
    {
      id: 35,
      code: 10,
      areaCode: {
        code: 2,
        name: "Incheon",
      },
      name: "Jung-gu",
    },
  ],

  3: [
    {
      id: 36,
      code: 1,
      areaCode: {
        code: 3,
        name: "Daejeon",
      },
      name: "Daedeok-gu",
    },
    {
      id: 37,
      code: 2,
      areaCode: {
        code: 3,
        name: "Daejeon",
      },
      name: "Dong-gu",
    },
    {
      id: 38,
      code: 3,
      areaCode: {
        code: 3,
        name: "Daejeon",
      },
      name: "Seo-gu",
    },
    {
      id: 39,
      code: 4,
      areaCode: {
        code: 3,
        name: "Daejeon",
      },
      name: "Yuseong-gu",
    },
    {
      id: 40,
      code: 5,
      areaCode: {
        code: 3,
        name: "Daejeon",
      },
      name: "Jung-gu",
    },
  ],
  4: [
    {
      id: 41,
      code: 1,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Nam-gu",
    },
    {
      id: 42,
      code: 2,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Dalseo-gu",
    },
    {
      id: 43,
      code: 3,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Dalseong-gun",
    },
    {
      id: 44,
      code: 4,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Dong-gu",
    },
    {
      id: 45,
      code: 5,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Buk-gu",
    },
    {
      id: 46,
      code: 6,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Seo-gu",
    },
    {
      id: 47,
      code: 7,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Suseong-gu",
    },
    {
      id: 48,
      code: 8,
      areaCode: {
        code: 4,
        name: "Daegu",
      },
      name: "Jung-gu",
    },
  ],
  5: [
    {
      id: 49,
      code: 1,
      areaCode: {
        code: 5,
        name: "Gwangju",
      },
      name: "Gwangsan-gu",
    },
    {
      id: 50,
      code: 2,
      areaCode: {
        code: 5,
        name: "Gwangju",
      },
      name: "Nam-gu",
    },
    {
      id: 51,
      code: 3,
      areaCode: {
        code: 5,
        name: "Gwangju",
      },
      name: "Dong-gu",
    },
    {
      id: 52,
      code: 4,
      areaCode: {
        code: 5,
        name: "Gwangju",
      },
      name: "Buk-gu",
    },
    {
      id: 53,
      code: 5,
      areaCode: {
        code: 5,
        name: "Gwangju",
      },
      name: "Seo-gu",
    },
  ],
  6: [
    {
      id: 54,
      code: 1,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Gangseo-gu",
    },
    {
      id: 55,
      code: 2,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Geumjeong-gu",
    },
    {
      id: 56,
      code: 3,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Gijang-gun",
    },
    {
      id: 57,
      code: 4,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Nam-gu",
    },
    {
      id: 58,
      code: 5,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Dong-gu",
    },
    {
      id: 59,
      code: 6,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Dongnae-gu",
    },
    {
      id: 60,
      code: 7,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Busanjin-gu",
    },
    {
      id: 61,
      code: 8,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Buk-gu",
    },
    {
      id: 62,
      code: 9,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Sasang-gu",
    },
    {
      id: 63,
      code: 10,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Saha-gu",
    },
    {
      id: 64,
      code: 11,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Seo-gu",
    },
    {
      id: 65,
      code: 12,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Suyeong-gu",
    },
    {
      id: 66,
      code: 13,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Yeonje-gu",
    },
    {
      id: 67,
      code: 14,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Yeongdo-gu",
    },
    {
      id: 68,
      code: 15,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Jung-gu",
    },
    {
      id: 69,
      code: 16,
      areaCode: {
        code: 6,
        name: "Busan",
      },
      name: "Haeundae-gu",
    },
  ],
  7: [
    {
      id: 70,
      code: 1,
      areaCode: {
        code: 7,
        name: "Ulsan",
      },
      name: "Jung-gu",
    },
    {
      id: 71,
      code: 2,
      areaCode: {
        code: 7,
        name: "Ulsan",
      },
      name: "Nam-gu",
    },
    {
      id: 72,
      code: 3,
      areaCode: {
        code: 7,
        name: "Ulsan",
      },
      name: "Dong-gu",
    },
    {
      id: 73,
      code: 4,
      areaCode: {
        code: 7,
        name: "Ulsan",
      },
      name: "Buk-gu",
    },
    {
      id: 74,
      code: 5,
      areaCode: {
        code: 7,
        name: "Ulsan",
      },
      name: "Ulju-gun",
    },
  ],
  8: [
    {
      id: 75,
      code: 1,
      areaCode: {
        code: 8,
        name: "Sejong",
      },
      name: "Sejong",
    },
  ],
  31: [
    {
      id: 76,
      code: 1,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gapyeong-gun",
    },
    {
      id: 77,
      code: 2,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Goyang-si",
    },
    {
      id: 78,
      code: 3,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gwacheon-si",
    },
    {
      id: 79,
      code: 4,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gwangmyeong-si",
    },
    {
      id: 80,
      code: 5,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gwangju-si",
    },
    {
      id: 81,
      code: 6,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Guri-si",
    },
    {
      id: 82,
      code: 7,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gunpo-si",
    },
    {
      id: 83,
      code: 8,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Gimpo-si",
    },
    {
      id: 84,
      code: 9,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Namyangju-si",
    },
    {
      id: 85,
      code: 10,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Dongducheon-si",
    },
    {
      id: 86,
      code: 11,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Bucheon-si",
    },
    {
      id: 87,
      code: 12,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Seongnam-si",
    },
    {
      id: 88,
      code: 13,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Suwon-si",
    },
    {
      id: 89,
      code: 14,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Siheung-si",
    },
    {
      id: 90,
      code: 15,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Ansan-si",
    },
    {
      id: 91,
      code: 16,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Anseong-si",
    },
    {
      id: 92,
      code: 17,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Anyang-si",
    },
    {
      id: 93,
      code: 18,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Yangju-si",
    },
    {
      id: 94,
      code: 19,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Yangpyeong-gun",
    },
    {
      id: 95,
      code: 20,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Yeoju-si",
    },
    {
      id: 96,
      code: 21,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Yeoncheon-gun",
    },
    {
      id: 97,
      code: 22,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Osan-si",
    },
    {
      id: 98,
      code: 23,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Yongin-si",
    },
    {
      id: 99,
      code: 24,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Uiwang-si",
    },
    {
      id: 100,
      code: 25,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Uijeongbu-si",
    },
    {
      id: 101,
      code: 26,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Icheon-si",
    },
    {
      id: 102,
      code: 27,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Paju-si",
    },
    {
      id: 103,
      code: 28,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Pyeongtaek-si",
    },
    {
      id: 104,
      code: 29,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Pocheon-si",
    },
    {
      id: 105,
      code: 30,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Hanam-si",
    },
    {
      id: 106,
      code: 31,
      areaCode: {
        code: 31,
        name: "Gyeonggi-do",
      },
      name: "Hwaseong-si",
    },
  ],

  32: [
    {
      id: 107,
      code: 1,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Gangneung-si",
    },
    {
      id: 108,
      code: 2,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Goseong-gun",
    },
    {
      id: 109,
      code: 3,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Donghae-si",
    },
    {
      id: 110,
      code: 4,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Samcheok-si",
    },
    {
      id: 111,
      code: 5,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Sokcho-si",
    },
    {
      id: 112,
      code: 6,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Yanggu-gun",
    },
    {
      id: 113,
      code: 7,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Yangyang-gun",
    },
    {
      id: 114,
      code: 8,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Yeongwol-gun",
    },
    {
      id: 115,
      code: 9,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Wonju-si",
    },
    {
      id: 116,
      code: 10,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Inje-gun",
    },
    {
      id: 117,
      code: 11,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Jeongseon-gun",
    },
    {
      id: 118,
      code: 12,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Cheorwon-gun",
    },
    {
      id: 119,
      code: 13,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Chuncheon-si",
    },
    {
      id: 120,
      code: 14,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Taebaek-si",
    },
    {
      id: 121,
      code: 15,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Pyeongchang-gun",
    },
    {
      id: 122,
      code: 16,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Hongcheon-gun",
    },
    {
      id: 123,
      code: 17,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Hwacheon-gun",
    },
    {
      id: 124,
      code: 18,
      areaCode: {
        code: 32,
        name: "Gangwon-do",
      },
      name: "Hoengseong-gun",
    },
  ],
  33: [
    {
      id: 125,
      code: 1,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Goesan-gun",
    },
    {
      id: 126,
      code: 2,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Danyang-gun",
    },
    {
      id: 127,
      code: 3,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Boeun-gun",
    },
    {
      id: 128,
      code: 4,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Yeongdong-gun",
    },
    {
      id: 129,
      code: 5,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Okcheon-gun",
    },
    {
      id: 130,
      code: 6,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Eumseong-gun",
    },
    {
      id: 131,
      code: 7,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Jecheon-si",
    },
    {
      id: 132,
      code: 8,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Jincheon-gun",
    },
    {
      id: 133,
      code: 9,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Cheongwon-gun",
    },
    {
      id: 134,
      code: 10,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Cheongju-si",
    },
    {
      id: 135,
      code: 11,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Chungju-si",
    },
    {
      id: 136,
      code: 12,
      areaCode: {
        code: 33,
        name: "Chungcheongbuk-do",
      },
      name: "Jeungpyeong-gun",
    },
  ],
  34: [
    {
      id: 137,
      code: 1,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Gongju-si",
    },
    {
      id: 138,
      code: 2,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Geumsan-gun",
    },
    {
      id: 139,
      code: 3,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Nonsan-si",
    },
    {
      id: 140,
      code: 4,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Dangjin-si",
    },
    {
      id: 141,
      code: 5,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Boryeong-si",
    },
    {
      id: 142,
      code: 6,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Buyeo-gun",
    },
    {
      id: 143,
      code: 7,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Seosan-si",
    },
    {
      id: 144,
      code: 8,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Seocheon-gun",
    },
    {
      id: 145,
      code: 9,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Asan-si",
    },
    {
      id: 146,
      code: 11,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Yesan-gun",
    },
    {
      id: 147,
      code: 12,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Cheonan-si",
    },
    {
      id: 148,
      code: 13,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Cheongyang-gun",
    },
    {
      id: 149,
      code: 14,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Taean-gun",
    },
    {
      id: 150,
      code: 15,
      areaCode: {
        code: 34,
        name: "Chungcheongnam-do",
      },
      name: "Hongseong-gun",
    },
  ],
  35: [
    {
      id: 151,
      code: 1,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Gyeongsan-si",
    },
    {
      id: 152,
      code: 2,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Gyeongju-si",
    },
    {
      id: 153,
      code: 3,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Goryeong-gun",
    },
    {
      id: 154,
      code: 4,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Gumi-si",
    },
    {
      id: 155,
      code: 5,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Gunwi-gun",
    },
    {
      id: 156,
      code: 6,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Gimcheon-si",
    },
    {
      id: 157,
      code: 7,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Mungyeong-si",
    },
    {
      id: 158,
      code: 8,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Bonghwa-gun",
    },
    {
      id: 159,
      code: 9,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Sangju-si",
    },
    {
      id: 160,
      code: 10,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Seongju-gun",
    },
    {
      id: 161,
      code: 11,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Andong-si",
    },
    {
      id: 162,
      code: 12,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Yeongdeok-gun",
    },
    {
      id: 163,
      code: 13,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Yeongyang-gun",
    },
    {
      id: 164,
      code: 14,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Yeongju-si",
    },
    {
      id: 165,
      code: 15,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Yeongcheon-si",
    },
    {
      id: 166,
      code: 16,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Yecheon-gun",
    },
    {
      id: 167,
      code: 17,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Ulleung-gun",
    },
    {
      id: 168,
      code: 18,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Uljin-gun",
    },
    {
      id: 169,
      code: 19,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Uiseong-gun",
    },
    {
      id: 170,
      code: 20,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Cheongdo-gun",
    },
    {
      id: 171,
      code: 21,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Cheongsong-gun",
    },
    {
      id: 172,
      code: 22,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Chilgok-gun",
    },
    {
      id: 173,
      code: 23,
      areaCode: {
        code: 35,
        name: "Gyeongsangbuk-do",
      },
      name: "Pohang-si",
    },
  ],
  36: [
    {
      id: 174,
      code: 1,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Geoje-si",
    },
    {
      id: 175,
      code: 2,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Geochang-gun",
    },
    {
      id: 176,
      code: 3,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Goseong-gun",
    },
    {
      id: 177,
      code: 4,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Gimhae-si",
    },
    {
      id: 178,
      code: 5,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Namhae-gun",
    },
    {
      id: 179,
      code: 6,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Masan-si",
    },
    {
      id: 180,
      code: 7,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Miryang-si",
    },
    {
      id: 181,
      code: 8,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Sacheon-si",
    },
    {
      id: 182,
      code: 9,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Sancheong-gun",
    },
    {
      id: 183,
      code: 10,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Yangsan-si",
    },
    {
      id: 184,
      code: 12,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Uiryeong-gun",
    },
    {
      id: 185,
      code: 13,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Jinju-si",
    },
    {
      id: 186,
      code: 14,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Jinhae-si",
    },
    {
      id: 187,
      code: 15,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Changnyeong-gun",
    },
    {
      id: 188,
      code: 16,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Changwon-si",
    },
    {
      id: 189,
      code: 17,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Tongyeong-si",
    },
    {
      id: 190,
      code: 18,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Hadong-gun",
    },
    {
      id: 191,
      code: 19,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Haman-gun",
    },
    {
      id: 192,
      code: 20,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Hamyang-gun",
    },
    {
      id: 193,
      code: 21,
      areaCode: {
        code: 36,
        name: "Gyeongsangnam-do",
      },
      name: "Hapcheon-gun",
    },
  ],
  37: [
    {
      id: 194,
      code: 1,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Gochang-gun",
    },
    {
      id: 195,
      code: 2,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Gunsan-si",
    },
    {
      id: 196,
      code: 3,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Gimje-si",
    },
    {
      id: 197,
      code: 4,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Namwon-si",
    },
    {
      id: 198,
      code: 5,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Muju-gun",
    },
    {
      id: 199,
      code: 6,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Buan-gun",
    },
    {
      id: 200,
      code: 7,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Sunchang-gun",
    },
    {
      id: 201,
      code: 8,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Wanju-gun",
    },
    {
      id: 202,
      code: 9,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Iksan-si",
    },
    {
      id: 203,
      code: 10,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Imsil-gun",
    },
    {
      id: 204,
      code: 11,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Jangsu-gun",
    },
    {
      id: 205,
      code: 12,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Jeonju-si",
    },
    {
      id: 206,
      code: 13,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Jeongeup-si",
    },
    {
      id: 207,
      code: 14,
      areaCode: {
        code: 37,
        name: "Jeollabuk-do",
      },
      name: "Jinan-gun",
    },
  ],
  38: [
    {
      id: 208,
      code: 1,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Gangjin-gun",
    },
    {
      id: 209,
      code: 2,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Goheung-gun",
    },
    {
      id: 210,
      code: 3,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Gokseong-gun",
    },
    {
      id: 211,
      code: 4,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Gwangyang-si",
    },
    {
      id: 212,
      code: 5,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Gurye-gun",
    },
    {
      id: 213,
      code: 6,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Naju-si",
    },
    {
      id: 214,
      code: 7,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Damyang-gun",
    },
    {
      id: 215,
      code: 8,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Mokpo-si",
    },
    {
      id: 216,
      code: 9,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Muan-gun",
    },
    {
      id: 217,
      code: 10,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Boseong-gun",
    },
    {
      id: 218,
      code: 11,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Suncheon-si",
    },
    {
      id: 219,
      code: 12,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Sinan-gun",
    },
    {
      id: 220,
      code: 13,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Yeosu-si",
    },
    {
      id: 221,
      code: 16,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Yeonggwang-gun",
    },
    {
      id: 222,
      code: 17,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Yeongam-gun",
    },
    {
      id: 223,
      code: 18,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Wando-gun",
    },
    {
      id: 224,
      code: 19,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Jangseong-gun",
    },
    {
      id: 225,
      code: 20,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Jangheung-gun",
    },
    {
      id: 226,
      code: 21,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Jindo-gun",
    },
    {
      id: 227,
      code: 22,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Hampyeong-gun",
    },
    {
      id: 228,
      code: 23,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Haenam-gun",
    },
    {
      id: 229,
      code: 24,
      areaCode: {
        code: 38,
        name: "Jeollanam-do",
      },
      name: "Hwasun-gun",
    },
  ],
  39: [
    {
      id: 230,
      code: 3,
      areaCode: {
        code: 39,
        name: "Jeju-do",
      },
      name: "Seogwipo-si",
    },
    {
      id: 231,
      code: 4,
      areaCode: {
        code: 39,
        name: "Jeju-do",
      },
      name: "Jeju-si",
    },
  ],
};
