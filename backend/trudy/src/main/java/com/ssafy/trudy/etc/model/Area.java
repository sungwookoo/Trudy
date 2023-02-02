package com.ssafy.trudy.etc.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "area")
public class Area {
    
    @Id
    @GeneratedValue
    private Long code;

    @Column(length = 45)
    private String name;
}
