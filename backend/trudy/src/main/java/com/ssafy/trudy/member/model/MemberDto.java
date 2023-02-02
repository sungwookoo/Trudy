package com.ssafy.trudy.member.model;

import lombok.*;


@Getter
@NoArgsConstructor
public class MemberDto {
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



    @Builder
    public MemberDto(Long id, String email, String password, String name, String image, String gender, Long areaCode, Long sigunguCode, String birth, byte isLocal, byte isPublic) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.areaCode = areaCode;
        this.sigunguCode = sigunguCode;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
    }
}
