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
export const refreshTokenHandler = async (
  accessToken: string,
  refreshToken: string
) => {
  const url = "/api/reissuance";
  const token = { accessToken, refreshToken };
  const response = await POST(url, token, {});

  return response;
};

// 이메일 인증 함수
export const verifyEmail = async (email: string) => {
  const url = "api/emailConfirm/";
  // const response = axios.post(url, {}, { params: {email : email}});
  // const data = new FormData();
  // data.append("email", JSON.stringify(email));
  // const response = axios.post(url, data, {});
  const params = { email: email };
  try {
    const response: any = await axios.post(url, {}, { params });
    console.log(response);
    return response;
  } catch (error) {
    return null;
  }

  // response
  //   .then(() => {
  //     return response;
  //   })
  //   .catch((e) => {
  //     return null;
  //   });
};

// 회원가입 url을 POST방식으로 호출하는 함수
export const signUpActionHandler = async (
  email: string,
  password: string,
  name: string,
  gender: string,
  birth: string,
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
    birth,
    isLocal,
    areaCode,
    sigunguCode,
  };
  try {
    const response = await axios.post(url, data, {});
    return response;
  } catch (error) {
    return null;
  }
};

// 로그인 url을 POST방식으로 호출하는 함수
export const signInActionHandler = (email: string, password: string) => {
  const url = "/api/login";
  const data = { email, password };
  const response = POST(url, data, {});
  // response.then((res) => {
  //   return res;
  // });
  return response;
};

// 로그아웃 함수
// localStorage의 토큰과 만료시간을 삭제한다
export const signOutActionHandler = (id: number) => {
  const url = "api/logout";
  const data = new FormData();
  data.append("id", JSON.stringify(id));
  const response = axios.post(url, data, {});
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  alert("sign out");
  window.location.reload();
  return response;
};

// 내 정보를 가져오는 함수
export const getMyDataHandler = (token: string) => {
  const url = "api/member/me";
  const headers = createTokenHeader(token);
  const response = axios.get(url, headers);
  console.log(response);
  return response;
};

// 계정 정보를 수정하는 함수
export const accountEditActionHandler = async (
  name: string,
  gender: string,
  birth: string,
  isLocal: string,
  areaCode: number,
  sigunguCode: number,
  token: string
) => {
  const url = "/api/member/info";
  const data = {
    name,
    gender,
    birth,
    isLocal,
    areaCode,
    sigunguCode,
  };
  const headers = createTokenHeader(token);
  try {
    const response = await PUT(url, data, headers);
    return response;
  } catch (error) {
    return null;
  }
};

// 비밀번호를 수정하는 함수
export const passwordChangeActionHandler = async (
  currentPassword: string,
  newPassword: string,
  token: string
) => {
  // try {
  //   const response = await axios.put(
  //     `/api/member/password?currentPassword=${currentPassword}&newPassword=${newPassword}`,
  //     // {
  //     //   currentPassword: currentPassword,
  //     //   newPassword: newPassword,
  //     // },
  //     {
  //       headers: { Authorization: `bearer ${token}` },
  //     }
  //   );
  //   console.log(response);
  // } catch (error) {
  //   console.log(error, "실패");
  // }
  const url = "/api/member/password";
  const params = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };

  const headers = {
    Authorization: "bearer " + token,
    "Content-Type": "application/json",
  };
  try {
    // const response = await PUT(url, data, headers);
    const response = await axios.put(url, {}, { headers, params });
    console.log("성공", response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
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
  const headers = createTokenHeader(token);
  const response = GET(url, headers);

  return response;
};

// 유저의 plan을 POST 방식으로 생성
export const createPlan = (token: string, sequence: string) => {
  const url = "/api/planner/post";
  const headers = createTokenHeader(token);
  const data = new FormData();
  data.append("sequence", JSON.stringify(sequence));

  const response = POST(url, data, headers);
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
  // const headers = createTokenHeader(token)
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
export const updateDayItem = (
  dayId: number,
  dayItemId: number,
  sequence: number,
  token: string
) => {
  const url = "/api/planner/dayitem";
  const headers = createTokenHeader(token);
  // const data = new FormData()
  //  data.append('dayId' , JSON.stringify(dayId))
  //  data.append('dayItemId' , JSON.stringify(dayItemId))
  //  data.append('sequence' , JSON.stringify(sequence))
  const params = { dayId: dayId, placeId: dayItemId, sequence: sequence };
  const response = PUT(url, { headers }, { params });
};
