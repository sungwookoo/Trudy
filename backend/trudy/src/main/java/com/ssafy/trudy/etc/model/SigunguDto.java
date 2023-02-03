package com.ssafy.trudy.etc.model;

import jdk.jfr.StackTrace;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@StackTrace
@NoArgsConstructor
public class SigunguDto {
    private Long id;
    private int code;
    private Area areaCode;
    private String name;

    @Builder
    public SigunguDto(Long id, int code, Area areaCode, String name) {
        this.id = id;
        this.code = code;
        this.areaCode = areaCode;
        this.name = name;
    }
}
