package com.ssafy.trudy.member.model;

import com.ssafy.trudy.member.repository.IntroduceRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberInfoDto {
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

    public MemberInfoDto(Member member) {
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

    @Builder
    public MemberInfoDto(Long id, String email, String password, String name, String image, String gender, Long areaCode, Long sigunguCode, String birth, byte isLocal, byte isPublic) {
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