import axios from "axios";
import { GET, POST, DELETE, PUT } from "./authAxios";

// 토큰을 만드는 함수
const createTokenHeader = (token: string) => {
  return {
    headers: {
      Authorization: "bearer " + token,
    },
  };
};

// 토큰의 만료시간을 계산하는 함수
const calculateRemainingTime = (expirationTime: number) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

// 토큰값과 만료시간을 localStorage에 저장하는 함수
export const signInTokenHandler = (
  token: string,
  refreshToken: string,
  expirationTime: number
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("expirationTime", String(expirationTime));

  const remainingTime = calculateRemainingTime(expirationTime);
  return remainingTime;
};

// localStorage에 토큰이 존재하는지 검사하는 함수
export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime") || "0";

  const remaingTime = calculateRemainingTime(+storedExpirationDate);

  if (remaingTime <= 10) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return {
      token: null,
      duration: 0,
    };
  }

  return {
    token: storedToken,
    duration: remaingTime,
  };
};

// 토큰을 재발행하는 함수
export const refreshTokenHandler = (
  accessToken: string,
  refreshToken: string
) => {
  const url = "/api/reissuance";
  const token = { accessToken, refreshToken };
  const response = POST(url, token, {});
  console.log("토큰 재발행", response);
};

// 이메일 인증 함수
export const verifyEmail = (email: string) => {
  const url = "api/emailConfirm";
  const params = { email };
  const response = POST(url, {}, { params });
  return response;
};

// 회원가입 url을 POST방식으로 호출하는 함수
export const signUpActionHandler = (
  email: string,
  password: string,
  name: string,
  gender: string,
  birthday: string,
  isLocal: string,
  areaCode: number,
  sigunguCode: number
) => {
  const url = "/api/signup";
  const data = {
    email,
    password,
    name,
    gender,
    birthday,
    isLocal,
    areaCode,
    sigunguCode,
  };
  const response = POST(url, data, {});
  return response;
};

// 로그인 url을 POST방식으로 호출하는 함수
export const signInActionHandler = (email: string, password: string) => {
  const url = "/api/login";
  const data = { email, password };
  const response = POST(url, data, {});
  return response;
};

// 로그아웃 함수
// localStorage의 토큰과 만료시간을 삭제한다
export const signOutActionHandler = (id: number) => {
  const data = new FormData();
  data.append("id", JSON.stringify(id));
  const response = axios.post(`api/logout`, data);
  console.log(id, "테스트 중입니당ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  alert("sign out");

  return response;
};

// 스퀘어 유저의 정보를 GET방식으로 호출
export const getUserActionHandler = (params: any) => {
  const url = "/api/member";
  const response = GET(url, { params });
  return response;
};

// 유저의 닉네임 변경을 POST방식으로 호출
// export const changeNicknameActionHandler = (
//   nickname: string,
//   token: string
// ) => {
//   const url = "";
//   const changeNicknameObj = { nickname };
//   const response = POST(url, changeNicknameObj, createTokenHeader(token));

//   return response;
// };

// 유저의 비밀번호 변경을 POST방식으로 호출
// export const changePasswordActionHandler = (
//   exPassword: string,
//   newPassword: string,
//   token: string
// ) => {
//   const url = "/member/password";
//   const changePasswordObj = { exPassword, newPassword };
//   const response = POST(url, changePasswordObj, createTokenHeader(token));
//   return response;
// };

// 유저의 Planner 정보를 GET방식으로 호출
export const getPlanner = (token: string) => {
  const url = "/api/planner";
  // const params = { memberId: memberId };
  // const params = { memberId: 1 };
  const headers = createTokenHeader(token)
  const response = GET(url, headers );

  return response;
};

// 유저의 plan을 POST 방식으로 생성
export const createPlan = (token: string, sequence: number) => {
  const url = "/api/planner/post";
  // const headers = createTokenHeader(token)
  const headers = {
    Authorization: "bearer " + token,
  }
  const params = { sequence: sequence };
  const response = POST(url, headers, { params });
};

// 유저의 plan을 PUT 방식으로 수정
export const updatePlan = (plannerId: number, sequence: number) => {
  const url = "/api/planner/planner";
  const params = { plannerId: plannerId, sequence: sequence };
  const response = PUT(url, {}, { params });
};

// 유저의 plan을 DELETE 방식으로 삭제
export const deletePlan = (plannerId: number | null) => {
  const url = "/api/planner/planner/delete";
  const params = { plannerId: plannerId };
  console.log(plannerId);
  const response = DELETE(url, { params });
};

// 유저의 day를 POST 방식으로 생성
export const createDay = (
  plannerId: number,
  day: string,
  memo: string,
  sequence: number
) => {
  const url = "/api/planner/day/post";
  const params = {
    plannerId: plannerId,
    day: day,
    memo: memo,
    sequence: sequence,
  };
  const response = POST(url, {}, { params });
};

// 유저의 day을 PUT 방식으로 수정
export const updateDay = (dayId: number, sequence: number) => {
  const url = "/api/planner/day";
  const params = { dayId: dayId, sequence: sequence };
  const response = PUT(url, {}, { params });
};


// 유저의 day를 DELETE 방식으로 삭제
export const deleteDay = (dayId: number | null) => {
  const url = "/api/planner/day/delete";
  const params = { dayId: dayId };
  const response = DELETE(url, { params });
};

// 유저의 dayItem을 PUT 방식으로 수정
export const updateDayItem = (dayItemId: number, sequence: number) => {
  const url = "/api/planner/dayitem";
  const params = { dayItemId: dayItemId, sequence: sequence };
  const response = PUT(url, {}, { params });
};
