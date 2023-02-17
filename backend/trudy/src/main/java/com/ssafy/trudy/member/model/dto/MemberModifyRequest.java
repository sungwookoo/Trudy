package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.ObjectUtils;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberModifyRequest {
    private static final String PHONE_NUMBER_REGEX = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$";
    private static final String USER_NAME_REGEX = "^[a-zA-Z가-힣]*$";
    private static final String USER_NICKNAME_REGEX = "^[a-z]*$";
    private static final String USER_PASSWORD_REGEX = "(?=.*\\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$";

    @NotNull(message = "이름은 필수 항목입니다.")
    private String name;
    @NotNull(message = "패스워드는 필수 항목입니다.")
    private String password;

    @NotNull(message = "성별은 필수 항목입니다.")
    private String gender;
    @NotNull(message = "생년월일은 필수 항목입니다.")
    private String birth;

    @NotNull(message = "로컬 여부는 필수 항목입니다.")
    private String isLocal;

    private Long areaCode;
    private Long sigunguCode;

    public void validation() {
        if (ObjectUtils.isEmpty(this.name)
                || !this.name.matches(USER_NAME_REGEX)) {
            throw new ApiException(ServiceErrorType.INVALID_USER_NAME);
        }

        if (ObjectUtils.isEmpty(this.password)
                || !this.password.matches(USER_PASSWORD_REGEX)) {
            throw new ApiException(ServiceErrorType.INVALID_USER_PASSWORD);
        }
    }
}