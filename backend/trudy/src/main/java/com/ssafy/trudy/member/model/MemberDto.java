package com.ssafy.trudy.member.model;

import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String image;
    private String gender;
    private String area;
    private String birth;
    private byte isLocal;
    private byte isPublic;
    private MemberRole role;
    private LocalDateTime lastAccess;

    @Builder
    public MemberDto(Long id, String email, String password, String name, String image, String gender, String area, String birth, byte isLocal, byte isPublic, MemberRole role, LocalDateTime lastAccess) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.image = image;
        this.gender = gender;
        this.area = area;
        this.birth = birth;
        this.isLocal = isLocal;
        this.isPublic = isPublic;
        this.role = role;
        this.lastAccess = lastAccess;
    }
}
