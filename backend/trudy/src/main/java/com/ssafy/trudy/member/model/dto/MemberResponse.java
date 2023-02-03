package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.auth.dto.response.MemberPostResponse;
import com.ssafy.trudy.member.model.MemberRole;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberResponse {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String image;
    private String gender;
    private Long areaCode;
    private Long sigunguCode;
    private String birth;
    private byte isLocal;
    private byte isPublic;
    private MemberRole role;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastAccess;
    private Long introduceId;
    private MemberPostResponse posts;
}
