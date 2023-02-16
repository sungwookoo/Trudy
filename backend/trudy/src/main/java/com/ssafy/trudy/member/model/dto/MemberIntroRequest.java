package com.ssafy.trudy.member.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberIntroRequest {
    private String title;
    private String plan;
    private String self;
    private String language;

    private String facebook;

    private String instagram;

    private String twitter;

    private String github;
}