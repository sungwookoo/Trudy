package com.ssafy.trudy.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//$$ jonghyun 로그인, 로그아웃, 회원가입, 회원 탈퇴
@Slf4j
@RestController
@RequestMapping("/api/member")
@CrossOrigin("*")
public class SignController {

    @GetMapping("/login")
    public Map<String, String> loginMember() {   //로그인하면 id, 비번 보내줌 -> 받아서
        log.debug("loginMember");

        Map<String, String> res = new HashMap<>();
        res.put("id", "john");
        res.put("password", "4452");

        return res;
    }

    @GetMapping("/logout")
    public Map<String, String> logoutMember() {   //로그아웃 하면 아이디를 보내준다 -> " "님이 로그아웃 하셔습니다 구현
        log.debug("logoutMember");

        Map<String, String> res = new HashMap<>();
        res.put("id", "john");

        return res;
    }

    @GetMapping("/signup")
    public Map<String, String> signupMember() {   //회원가입하면 유저 명 임시로 보내주고 -> " "님이 회원가입 성공했습니다 구현
        log.debug("signupMember");

        Map<String, String> res = new HashMap<>();
        res.put("id", "john");

        return res;
    }

    @GetMapping("/signout")
    public Map<String, String> signoutMember() {   //회원가입하면 유저 명 임시로 보내주고 -> " "님이 회원 탈퇴 완료되었습니다. 구현
        log.debug("signoutMember");

        Map<String, String> res = new HashMap<>();
        res.put("id", "john");

        return res;
    }

}
