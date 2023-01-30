import React, { useState, useEffect } from "react";

// User 데이터를 받아올 url 타입
interface IgetUserData {
    url: string;
}

// DB의 members 테이블로 부터 오는 데이터의 타입
interface IgetResponse {
    id: number;
    email: string;
    password: string;
    name: string;
    intro_title: string;
    image: string;
    gender: string;
    area: string;
    birth: string;
    is_local: number;
    is_public: number;
    intro_plan: string;
    intro_self: string;
    language: string;
}

export const getUserData = (url:IgetUserData) => {
    const [response, setResponse] = useState<IgetResponse[]>();



}