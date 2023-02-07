package com.ssafy.trudy.planner.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DayItemPutDto {

    private String memo;
    private String sequence;
    private String customTitle;
    private String customImage;
}
