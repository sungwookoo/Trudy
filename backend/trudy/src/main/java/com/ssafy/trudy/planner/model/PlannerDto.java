package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PlannerDto {

    private Long id;
    private Member memeberId;
    private String title;
    private String sequence;
}
