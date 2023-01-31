package com.ssafy.trudy.model.place;

import lombok.Data;

import javax.persistence.*;

// $$ 보류 디비명 수정해야할듯

@Data
@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue
    private Long id;

    private String addr1;

    @Column(length = 45)
    private String addr2;

    @Column(length = 45)
    private String areacode;

    @Column(length = 45)
    private String cat1;

    @Column(length = 45)
    private String cat2;

    @Column(length = 45)
    private String cat3;

    @Column(length = 45)
    private String contentid;

    @Column(length = 45)
    private String createdtypeid;

    @Column(length = 45)
    private String createdtime;

    private String firstimage;

    private String firstimage2;

    @Column(length = 45)
    private String mapx;

    @Column(length = 45)
    private String mapy;

    @Column(length = 45)
    private String mlevel;

    @Column(length = 45)
    private String modifiedtime;

    @Column(length = 45)
    private String readcount;

    @Column(length = 45)
    private String sigungucode;

    @Column(length = 45)
    private String tel;

    private String title;

    @Column(length = 45)
    private String zipcode;


}
