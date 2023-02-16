package com.ssafy.trudy.auth.controller;

import com.ssafy.trudy.auth.dto.request.LoginRequest;
import com.ssafy.trudy.auth.dto.request.SignupRequest;
import com.ssafy.trudy.auth.dto.request.TokenRequest;
import com.ssafy.trudy.auth.dto.response.TokenResponse;
import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.service.EmailService;
import com.ssafy.trudy.auth.service.MemberAppService;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ResponseHeader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@Slf4j
public class AuthAppController {
    @Autowired
    private MemberAppService memberAppService;

    @Autowired
    private EmailService emailService;

    // 로그인
    @ApiOperation(value = "로그인",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE)
            })
    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        return memberAppService.login(loginRequest);
    }

    // 토큰 재발행
    @ApiOperation(value = "토큰 재발행",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE)
            })
    @PostMapping("/reissuance")
    public TokenResponse reissuance(@Valid @RequestBody TokenRequest tokenRequest) {
        return memberAppService.reissuance(tokenRequest);
    }

    // 회원 가입
    @ApiOperation(value = "회원 가입",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE)
            })

    @PostMapping("/signup")
    public MemberResponse signUp(
            @RequestBody SignupRequest signupRequest) {
        return memberAppService.signup(signupRequest);
    }

    @ApiOperation(value = "회원가입 닉네임 중복 검사",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
            })
    @PostMapping("/signup/name")
    public String isSignupDupName(@RequestParam String name) {
        return memberAppService.isSignupDupName(name);
    }


    // 로그아웃
    @ApiOperation(value = "로그아웃",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })

    @PostMapping("/logout")
    public void logout(@RequestParam Long id) {
        memberAppService.logout(id);
    }



//    // 이메일 중복 검사
//    @ApiOperation(value = "이메일 중복 체크 / 1: 가입가능, 2: 가입불가",
//            produces = MediaType.APPLICATION_JSON_VALUE,
//            responseHeaders = {
//                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE)
//            })
//    @PostMapping("/emailCheck")
//    public String emailCheck(@RequestParam String email) {
//        String result = memberAppService.emailCheck(email);
//        return result;
//    }

    // 이메일 인증
    @ApiOperation(value = "이메일 인증",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE)
            })
    @PostMapping("/emailConfirm")
    public String emailConfirm(@RequestParam String email) {

        return emailService.sendSimpleMessage(email);
    }


}
