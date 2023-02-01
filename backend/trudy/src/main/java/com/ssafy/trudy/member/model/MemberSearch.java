package com.ssafy.trudy.member.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberSearch {

    private String userType;    // 회원타입 is_local: 1 아니면 0
    private String gender;      // 성별
    private String searchString;    // 검색어
}
