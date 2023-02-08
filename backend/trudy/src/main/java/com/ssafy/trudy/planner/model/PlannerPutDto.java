package com.ssafy.trudy.planner.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlannerPutDto {
    // 수정 값들만 response로 보내준다.
    private String title;
    private String sequence;
}
