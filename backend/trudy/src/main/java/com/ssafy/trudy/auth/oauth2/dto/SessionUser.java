package com.ssafy.trudy.auth.oauth2.dto;

import com.ssafy.trudy.member.model.Member;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    private String name;
    private String email;
    private String picture;

    public SessionUser(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
        this.picture = member.getImage();
    }
}