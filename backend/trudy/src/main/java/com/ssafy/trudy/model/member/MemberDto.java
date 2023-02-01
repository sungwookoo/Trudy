package com.ssafy.trudy.model.member;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

public class MemberDto {
    @Data
    @AllArgsConstructor
    public static class MemberListDto {
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
        private Timestamp lastAccess;
    }
}
