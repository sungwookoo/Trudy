package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.member.model.Member;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class PlannerDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlannerCombine{
        private PlannerElement plannerElement;
        private MemberElement memberElement;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DayCombine{
        private List<DayElement> dayElementList;
    }

    //Day
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DayElement{
        // 1. day 내용
        private Long id;
        private String day;
        private String memo;
        private String sequence;

        // 2. 해당 day에 대한 dayItem list
        private List<DayItemElement> dayItemList;
    }

    // DayItem
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DayItemElement {
        // dayItem 정보
        private Long id;
        private String memo;
        private String sequence;
        private String customTitle;
        private String customImage;
    }

    // planner 내부 요소------------------------------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlannerElement{
        private Long id;
        private String title;
        private String sequence;
    }

    // member요소---------------------------------
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberElement{
        private Long id;
        private String email;
        private String name;
        private String image;
        private String gender;
        private Long areaCode;
        private Long sigunguCode;
        private String birth;
        private byte isLocal;
        private byte isPublic;
        private LocalDateTime lastAccess;
    }
}
