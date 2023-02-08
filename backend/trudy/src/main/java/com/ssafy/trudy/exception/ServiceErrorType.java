package com.ssafy.trudy.exception;

import org.springframework.http.HttpStatus;

public enum ServiceErrorType {
    CREATED(HttpStatus.CREATED, 1, "등록 되었습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 1, "비 인가 사용자입니다."),
    WAS_LOGOUT_USER(HttpStatus.BAD_REQUEST, 1, "로그아웃 된 사용자입니다."),
    INVALID_USER_TOKEN(HttpStatus.BAD_REQUEST, 1, "토큰의 유저 정보가 일치하지 않습니다."),
    INVALID_USER_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, 1, "리프레시 토큰이 유효하지 않습니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, 1, "권한이 없습니다."),
    NOT_FOUND(HttpStatus.NOT_FOUND, 1, "해당 리소스를 찾을 수 없습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 1, "시스템에 문제가 발생하였습니다."),
    INVALID_PARAMETER(HttpStatus.CONFLICT, 1, "유효하지 않은 전달값입니다."),

    INVALID_USER_NAME(HttpStatus.BAD_REQUEST, 1, "이름은 한글, 영문 대소문자만 허용합니다.."),
    INVALID_USER_NICKNAME(HttpStatus.BAD_REQUEST, 2, "별명은 영문 소문자만 허용합니다."),
    INVALID_USER_PASSWORD(HttpStatus.BAD_REQUEST, 3, "비밀번호는 영문 대문자, 영문 소문자, 특수 문자, 숫자 각 1개 이상씩 포함합니다."),
    INVALID_USER_PHONE_NUMBER(HttpStatus.BAD_REQUEST, 4, "휴대폰 번호는 숫자만 허용합니다."),

    DUPLICATE_USER_NAME(HttpStatus.BAD_REQUEST, 5, "중복된 닉네임 이름입니다."),
    DUPLICATE_USER_EMAIL(HttpStatus.BAD_REQUEST, 6, "이미 가입된 이메일 주소입니다.")

    ;

    HttpStatus httpStatus;
    int code;
    String message;

    ServiceErrorType(HttpStatus httpStatus, int code, String message) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }
    public String getMessage() {
        return this.message;
    }
    public Integer getCode() {
        return code;
    }
}
