import { access } from "fs";
import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./authAction";
import jwtDecode from "jwt-decode";

let logoutTimer: NodeJS.Timeout;

type Props = { children?: React.ReactNode };
type UserInfo = { email: string; nickname: string };
type LoginToken = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

// Context의 Provider 역할, 즉 Context의 변화를 알리는 Provider 컴포넌트를 반환하는 함수
const AuthContext = React.createContext({
  token: "",
  userObj: { email: "", nickname: "" },
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  isVerified: false,
  loggedInfo: {iss: "", auth: "", uid: ""},
  signup: (
    email: string,
    password: string,
    nickname: string,
    gender: string,
    birthday: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {},
  sendCode: (email: string) => {},
  emailVerified: (email: string) => {},
  defaultVerified: () => {},
  login: (email: string, password: string) => {},
  signOut: () => {},
  getUser: (params: any) => {},
  //   changeNickname: (nickname: string) => {},
  //   changePassword: (exPassword: string, newPassword: string) => {},
  planner: () => {},
  createPlan: (memberId: number, sequence: number) => {},
});

export const AuthContextProvider: React.FC<Props> = (props) => {
  const tokenData = authAction.retrieveStoredToken();

  let initialToken: any;
  if (tokenData) {
    initialToken = tokenData.token!;
  }

  const [token, setToken] = useState(initialToken);
  const [userObj, setUserObj] = useState({
    email: "",
    nickname: "",
    // id: 0,
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isGetSuccess, setIsGetSuccess] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  // const [loggedInfo, setLoggedInfo] = useState<any>()

  const userIsLoggedIn = !!token;
  
  let loggedInfo = {iss: "", auth: "", uid: ""}
  if (token){
  loggedInfo = jwtDecode(token) as any
  }

  // Account

  // 이메일 중복을 확인하고 인증 코드를 보내는 함수
  const sendCode = async (email: string) => {
    const response: any = await authAction.verifyEmail(email);
    if (response === null) {
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
  const signupHandler = (
    email: string,
    password: string,
    nickname: string,
    gender: string,
    birthday: string,
    isLocal: string,
    areaCode: number,
    sigunguCode: number
  ) => {
    setIsSuccess(false);
    const response = authAction.signUpActionHandler(
      email,
      password,
      nickname,
      gender,
      birthday,
      isLocal,
      areaCode,
      sigunguCode
    );
    response
      .then((result) => {
        setIsSuccess(true);
        return result;
      })
      .catch((error) => alert(error.data.errorMessage));
  };

  //   로그인을 하는 함수
  const loginHandler = (email: string, password: string) => {
    setIsSuccess(false);
    const data = authAction.signInActionHandler(email, password);
    data.then((result) => {
      if (result !== null) {
        const loginData: LoginToken = result.data;
        setToken(loginData.accessToken);
        logoutTimer = setTimeout(
          signOutHandler,
          authAction.signInTokenHandler(
            loginData.accessToken,
            loginData.refreshToken,
            loginData.accessTokenExpiresIn
          )
          
          );
          // const localToken = localStorage.getItem("token")
          // if (localToken) {
          //   setLoggedInfo(jwtDecode(localToken))
          //   console.log(jwtDecode(localToken))
          // console.log('loggedInfo', loggedInfo)
          // }
          setIsSuccess(true);
        } else {
          alert("Wrong ID or Password!");
        }
      });
  };

  //   로그아웃을 하는 함수
  const signOutHandler = useCallback(() => {
    setToken("");
    authAction.signOutActionHandler(token);
    // setLoggedEmail("");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

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

  //   const changeNicknameHandler = (nickname: string) => {
  //     setIsSuccess(false);

  //     const data = authAction.changeNicknameActionHandler(nickname, token);
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
    const memberId = parseInt(loggedInfo.uid)
    const response = authAction.getPlanner(memberId);

    return response;
  };


  const createPlannerPlan = (
    memberId: number,
    sequence: number,
  ) => {
    const response = authAction.createPlan(memberId, sequence);

    return response
  }


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
    loggedInfo,
    sendCode: sendCode,
    emailVerified: emailVerified,
    defaultVerified: defaultVerified,
    signup: signupHandler,
    login: loginHandler,
    signOut: signOutHandler,
    getUser: getUserHandler,
    // changeNickname: changeNicknameHandler,
    // changePassword: changePaswordHandler,
    planner: getPlannerHandler,
    createPlan: createPlannerPlan,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
