package com.ssafy.trudy.auth.controller;

import com.ssafy.trudy.auth.dto.request.LoginRequest;
import com.ssafy.trudy.auth.dto.request.SignupRequest;
import com.ssafy.trudy.auth.dto.request.TokenRequest;
import com.ssafy.trudy.auth.dto.response.TokenResponse;
import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.service.MemberAppService;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Slf4j
public class AuthAppController {
    @Autowired
    private MemberAppService memberAppService;

    // 로그인
    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return memberAppService.login(loginRequest);
    }

    // 토큰 재발행
    @PostMapping("/reissuance")
    public TokenResponse reissuance(@Valid @RequestBody TokenRequest tokenRequest) {
        return memberAppService.reissuance(tokenRequest);
    }

    // 회원 가입
    @PostMapping("/signup")
    public MemberResponse signUp(@RequestBody SignupRequest signupRequest) {
        return memberAppService.signup(signupRequest);
    }

    // 로그아웃
    @DeleteMapping("/logout")
    public void logout(@AuthenticationPrincipal PrincipalDetails principal) {
        memberAppService.logout(principal);
    }
}
