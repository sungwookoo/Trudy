package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.place.model.Place;
import lombok.Builder;
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
    private String sequence;
    private String customTitle;

    @Builder DayItemDto(Long id, Place placeId, Day dayId, String sequence, String customTitle){
        this.id = id;
        this.placeId = placeId;
        this.dayId = dayId;
        this.sequence = sequence;
        this.customTitle = customTitle;
    };
}
