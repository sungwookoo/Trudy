import { access } from "fs";
import React, { useState, useEffect, useCallback } from "react";
import * as authAction from "./authAction";

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
  signup: (email: string, password: string, nickname: string) => {},
  login: (email: string, password: string) => {},
  signOut: () => {},
  getUser: (params: any) => {},
  //   changeNickname: (nickname: string) => {},
  //   changePassword: (exPassword: string, newPassword: string) => {},
  // planner: (userId: number) => {},
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

  const userIsLoggedIn = !!token;

  //  회원가입을 하는 함수
  const signupHandler = (email: string, password: string, nickname: string) => {
    setIsSuccess(false);
    const response = authAction.signUpActionHandler(email, password, nickname);
    response.then((result) => {
      if (result !== null) {
        setIsSuccess(true);
      }
    });
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
        setIsSuccess(true);
      } else {
        alert("Wrong ID or Password!")
      }
    })
  };

  //   로그아웃을 하는 함수
  const signOutHandler = useCallback(() => {
    setToken("");
    authAction.signOutActionHandler();
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
    // data.then((result) => {
    if (data !== null) {
      const userData: UserInfo = data.data;
      setUserObj(userData);
      setIsGetSuccess(true);
      // }
    }
    // console.log("data    1", data.data);
    // console.log("data    2", data.data.content[0]);
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

  // Planner 정보를 가져오는 함수
  const getUserPlannerHandler = (userId: number) => {
    authAction.getUserPlanner(userId);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(signOutHandler, tokenData.duration);
    }
  }, [tokenData, signOutHandler]);

  const contextValue = {
    token,
    userObj,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    signOut: signOutHandler,
    getUser: getUserHandler,
    // changeNickname: changeNicknameHandler,
    // changePassword: changePaswordHandler,
    // planner: getUserPlannerHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
