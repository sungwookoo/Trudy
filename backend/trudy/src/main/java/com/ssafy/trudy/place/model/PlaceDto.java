package com.ssafy.trudy.place.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlaceDto {
    private Long id;
    private String addr1;
    private String addr2;
    private String areacode;
    private String contenttypeid;
    private String firstimage;
    private String firstimage2;
    private String mapx;
    private String mapy;
    private String sigungucode;
    private String tel;
    private String title;
    private String zipcode;

    @Builder
    public PlaceDto(Long id, String addr1, String addr2, String areacode, String contenttypeid, String firstimage, String firstimage2, String mapx, String mapy, String sigungucode, String tel, String title, String zipcode) {
        this.id = id;
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.areacode = areacode;
        this.contenttypeid = contenttypeid;
        this.firstimage = firstimage;
        this.firstimage2 = firstimage2;
        this.mapx = mapx;
        this.mapy = mapy;
        this.sigungucode = sigungucode;
        this.tel = tel;
        this.title = title;
        this.zipcode = zipcode;
    }
}
