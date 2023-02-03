package com.ssafy.trudy.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest {
    @NotNull(message = "엑세스 토큰은 필수 항목입니다.")
    private String accessToken;
    @NotNull(message = "리프레시 토큰은 필수 항목입니다.")
    private String refreshToken;
}

