package com.ssafy.trudy.member.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum MemberRole {

    ADMIN("관리자"),
    MEMBER("회원");
    private String description;

    MemberRole(String description) {
        this.description = description;
    }
}
