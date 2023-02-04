package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberProfileResponse {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String gender;
    private Long areaCode;
    private String image;
    private Long sigunguCode;
    private String birth;
    private byte isLocal;
    private byte isPublic;
    private String title;
    private String self;
    private String plan;
    private String language;

    public MemberProfileResponse(Member member) {
        this.id = member.getId();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.name = member.getName();
        this.image = member.getImage();
        this.gender = member.getGender();
        this.areaCode = member.getAreaCode();
        this.sigunguCode = member.getSigunguCode();
        this.birth = member.getBirth();
        this.isLocal = member.getIsLocal();
        this.isPublic = member.getIsPublic();
        this.title = member.getIntroduceId().getTitle();
        this.plan = member.getIntroduceId().getPlan();
        this.self = member.getIntroduceId().getSelf();
        this.language = member.getIntroduceId().getLanguage();
    }
}