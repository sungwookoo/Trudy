package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.place.model.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DayItemDto {

    private Long id;
    private Place placeId;
    private Day dayId;
    private String memo;
    private String sequence;
    private String customTitle;
    private String customImage;

    private String customImageFileName;

}
