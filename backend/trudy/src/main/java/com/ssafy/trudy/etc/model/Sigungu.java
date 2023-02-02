package com.ssafy.trudy.etc.model;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "sigungu")
public class Sigungu {

    @Id
    @GeneratedValue
    private Long id;

    private int code;

    @ManyToOne
    @JoinColumn(name = "area_code")
    private Area areaCode;

    @Column(length = 45)
    private String name;
}
