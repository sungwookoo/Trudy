package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.member.model.Introduce;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberProfileResponse {
    private Long id;
    private String email;
    private String name;
    private String image;
    private String gender;
    private Long areaCode;
    private Long sigunguCode;
    private String birth;
    private String isLocal;
    private String isPublic;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastAccess;
    private Introduce introduceId;
    private MemberPostResponse posts;
}
