package com.ssafy.trudy.etc.model;

import jdk.jfr.StackTrace;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@StackTrace
@NoArgsConstructor
public class AreaDto {
    private Long id;
    private String name;

    @Builder
    public AreaDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
