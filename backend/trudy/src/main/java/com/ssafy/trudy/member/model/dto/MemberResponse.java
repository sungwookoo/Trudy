package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.member.model.Introduce;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


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

    private String imageFileName;
    private String gender;
    private Long areaCode;
    private Long sigunguCode;
    private String birth;
    private String isLocal;
    private String isPublic;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastAccess;
    private Introduce introduceId;
    private List<MemberPostResponse> posts;

    private String isFollow;

    private String isBan;
}
