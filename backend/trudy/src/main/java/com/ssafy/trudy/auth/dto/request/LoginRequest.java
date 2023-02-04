package com.ssafy.trudy.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @NotNull(message = "이메일은 필수 항목입니다.")
    private String email;
    @NotNull(message = "패스워드는 필수 항목입니다.")
    private String password;
}