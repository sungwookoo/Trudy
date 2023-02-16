import { access } from "fs";
import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./authAction";
import jwtDecode from "jwt-decode";

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode };
type UserInfo = { email: string; name: string };
type LoginToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

// Context의 Provider 역할, 즉 Context의 변화를 알리는 Provider 컴포넌트를 반환하는 함수
const AuthContext = React.createContext({
  token: "",
  userObj: { email: "", name: "" },
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  isVerified: false,
  isPasswordVerified: false,
  loggedInfo: { iss: "", auth: "", uid: 0 },
  signup: (
    email: string,
    password: string,
    name: string,
    gender: string,
    birth: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {},
  sendCode: (email: string) => {},
  emailVerified: (email: string) => {},
  defaultVerified: () => {},
  passwordVerified: () => {},
  defaultPasswordVerified: () => {},
  login: (email: string, password: string) => {},
  signOut: () => {},
  getMyData: () => {},
  accountEdit: (
    name: string,
    gender: string,
    birth: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {},
  passwordChange: (currentPassword: string, newPassword: string) => {},
  getUser: (params: any) => {},
  //   changeNickname: (name: string) => {},
  //   changePassword: (exPassword: string, newPassword: string) => {},
  planner: () => {},
  createPlan: (sequence: string) => {},
  updatePlan: (plannerId: number, sequence: number) => {},
  deletePlan: (plannerId: number | null) => {},
  updateDay: (dayId: number, sequence: number) => {},
  createDay: (
    plannerId: number,
    day: string,
    memo: string,
    sequence: number
  ) => {},
  deleteDay: (dayId: number | null) => {},
  updateDayItem: (dayId: number, dayItemId: number, sequence: number) => {},
});

export const AuthContextProvider: React.FC<Props> = (props) => {
  const tokenData = authAction.retrieveStoredToken();

  let initialToken: any;
  if (tokenData) {
    initialToken = tokenData.token!;
  }

  const [token, setToken] = useState(initialToken);
  const [refreshToken, setRefreshToken] = useState(initialToken);
  const [userObj, setUserObj] = useState({
    email: "",
    name: "",
    // id: 0,
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetSuccess, setIsGetSuccess] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false);

  const userIsLoggedIn = !!token;

  let loggedInfo = { iss: "", auth: "", uid: 0 };
  if (token) {
    loggedInfo = jwtDecode(token) as any;
  }

  // Account

  // 이메일 중복을 확인하고 인증 코드를 보내는 함수
  const sendCode = async (email: string) => {
    const response: any = await authAction.verifyEmail(email);
    if ((await response) === null) {
      alert("this email is already in use!!");
    } else {
      alert("Verification code has been sent");
      return response;
    }
  };

  // 이메일 인증을 완료했음을 기록하는 함수
  const emailVerified = (email: string) => {
    setIsVerified(true);
  };

  // 이메일 인증상태를 초기화 시킨다
  // signup 페이지로의 비정상 접근을 막는다
  const defaultVerified = () => {
    setIsVerified(false);
  };

  //  회원가입을 하는 함수
  const signupHandler = async (
    email: string,
    password: string,
    name: string,
    gender: string,
    birth: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {
    setIsSuccess(false);
    const response = await authAction.signUpActionHandler(
      email,
      password,
      name,
      gender,
      birth,
      isLocal,
      areaCode,
      sigunguCode
    );

    if (response !== null) {
      setIsSuccess(true);
      return response;
    } else {
      return null;
    }
  };

  //   로그인을 하는 함수
  const loginHandler = async (email: string, password: string) => {
    setIsSuccess(false);
    setIsSuccess(false);
    try {
      const result = await authAction.signInActionHandler(email, password);
      if (result !== null) {
        const loginData: LoginToken = result.data;
        setToken(loginData.accessToken);
        setRefreshToken(loginData.refreshToken);
        logoutTimer = setTimeout(
          signOutHandler,
          authAction.signInTokenHandler(
            loginData.accessToken,
            loginData.refreshToken,
            loginData.accessTokenExpiresIn
          )
        );
        setIsSuccess(true);
        return true;
      } else {
        alert("Wrong ID or Password!");

        return false;
      }
    } catch {
      return false;
    }
  };

  //   로그아웃을 하는 함수
  const signOutHandler = useCallback(async () => {
    await authAction.signOutActionHandler(loggedInfo.uid);
    setToken("");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // 내 데이터를 가져오는 함수
  const getMydata = async () => {
    try {
      const response = await authAction.getMyDataHandler(token);
      return response;
    } catch {
      return null;
    }
  };

  // 계정 정보를 수정하는 함수
  const accountEditHandler = async (
    name: string,
    gender: string,
    birth: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {
    const response = await authAction.accountEditActionHandler(
      name,
      gender,
      birth,
      isLocal,
      areaCode,
      sigunguCode,
      token
    );

    if (response !== null) {
      return response;
    } else {
      return null;
    }
  };

  // 비밀번호를 수정하는 함수
  const passwordChangeHandler = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const response = await authAction.passwordChangeActionHandler(
      currentPassword,
      newPassword,
      token
    );
    if (response !== null) {
      return response;
    } else {
      return null;
    }
  };

  // 비밀번호 인증을 완료했음을 기록하는 함수
  const passwordVerified = () => {
    setIsPasswordVerified(true);
  };

  // 비밀번호 인증상태를 초기화 시킨다
  // accountedit 페이지로의 비정상 접근을 막는다
  const defaultPasswordVerified = () => {
    setIsPasswordVerified(false);
  };

  // 유저 정보를 가져오는 함수
  const getUserHandler = async (params: any) => {
    setIsGetSuccess(false);
    // 토큰이 만료되지 않았으면 재발행
    // if (tokenData.duration > 0) {
    //   console.log('재발행 시도')
    // }
    const data = await authAction.getUserActionHandler(params);
    if (data !== null) {
      const userData: UserInfo = data.data;
      setUserObj(userData);
      setIsGetSuccess(true);
      // }
    }
    return data;
  };

  //   const changeNicknameHandler = (name: string) => {
  //     setIsSuccess(false);

  //     const data = authAction.changeNicknameActionHandler(name, token);
  //     data.then((result) => {
  //       if (result !== null) {
  //         const userData: UserInfo = result.data;
  //         setUserObj(userData);
  //         setIsSuccess(true);
  //       }
  //     });
  //   };

  //   const changePaswordHandler = (exPassword: string, newPassword: string) => {
  //     setIsSuccess(false);
  //     const data = authAction.changePasswordActionHandler(
  //       exPassword,
  //       newPassword,
  //       token
  //     );
  //     data.then((result) => {
  //       if (result !== null) {
  //         setIsSuccess(true);
  //         logoutHandler();
  //       }
  //     });
  //   };

  // Planner

  // Planner 정보를 가져오는 함수
  const getPlannerHandler = () => {
    const response = authAction.getPlanner(token);
    // const refresh = authAction.refreshTokenHandler(token, refreshToken)
    // refresh.then((res) => {
    //   console.log('재발행 data', res)
    //   setToken(res?.data.accessToken)
    //   setRefreshToken(res?.data.refreshToken)
    // })

    return response;
  };

  // planner의 plan을 생성하는 함수
  const createPlannerPlan = (sequence: string) => {
    const response = authAction.createPlan(token, sequence);

    return response;
  };

  // planner의 plan을 수정하는 함수
  const updatePlannerPlan = (plannerId: number, sequence: number) => {
    const response = authAction.updatePlan(plannerId, sequence);

    return response;
  };

  // planner의 plan를 삭제하는 함수
  const deletePlannerPlan = (plannerId: number | null) => {
    const response = authAction.deletePlan(plannerId);

    return response;
  };

  // planner의 day를 생성하는 함수
  const createPlannerDay = (
    plannerId: number,
    day: string,
    memo: string,
    sequence: number
  ) => {
    const response = authAction.createDay(plannerId, day, memo, sequence);

    return response;
  };

  // planner의 day을 수정하는 함수
  const updatePlannerDay = (dayId: number, sequence: number) => {
    const response = authAction.updateDay(dayId, sequence);

    return response;
  };

  // planner의 day를 삭제하는 함수
  const deletePlannerDay = (dayId: number | null) => {
    const response = authAction.deleteDay(dayId);

    return response;
  };

  // planner의 dayItem을 수정하는 함수
  const updatePlannerDayItem = (
    dayId: number,
    dayItemId: number,
    sequence: number
  ) => {
    const response = authAction.updateDayItem(
      dayId,
      dayItemId,
      sequence,
      token
    );

    return response;
  };

  // useEffect(() => {
  //   if (tokenData) {
  //     logoutTimer = setTimeout(signOutHandler, tokenData.duration);
  //   }
  // }, [tokenData, signOutHandler]);

  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    isVerified,
    isPasswordVerified,
    loggedInfo,
    sendCode: sendCode,
    emailVerified: emailVerified,
    passwordVerified: passwordVerified,
    defaultVerified: defaultVerified,
    defaultPasswordVerified: defaultPasswordVerified,
    signup: signupHandler,
    login: loginHandler,
    signOut: signOutHandler,
    getMyData: getMydata,
    accountEdit: accountEditHandler,
    passwordChange: passwordChangeHandler,
    getUser: getUserHandler,
    // changeNickname: changeNicknameHandler,
    // changePassword: changePaswordHandler,
    planner: getPlannerHandler,
    createPlan: createPlannerPlan,
    updatePlan: updatePlannerPlan,
    deletePlan: deletePlannerPlan,
    createDay: createPlannerDay,
    updateDay: updatePlannerDay,
    deleteDay: deletePlannerDay,
    updateDayItem: updatePlannerDayItem,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
