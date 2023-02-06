package com.ssafy.trudy.planner.model;

import lombok.*;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DayDto {

    private Long id;
    private String day;
    private String memo;

    public static class DayCombine{
        private Long id;
        private String day;
        private String memo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Day{
        private Long id;
        private String day;
        private String memo;
    }
}
