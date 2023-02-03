package com.ssafy.trudy.member.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRequest {
    private String email;
    private String password;
    private String name;
    private String gender;
    private Long areaCode;

    private Long sigunguCode;
    private String birth;
    private byte isLocal;
    private byte isPublic;
    private MemberRole role;
}
