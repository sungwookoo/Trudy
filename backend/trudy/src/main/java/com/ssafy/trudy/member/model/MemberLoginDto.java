package com.ssafy.trudy.member.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberLoginDto {
    private String email;
    private String password;
    private MemberRole role;

    @Builder
    public MemberLoginDto(String email, String password, MemberRole role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}