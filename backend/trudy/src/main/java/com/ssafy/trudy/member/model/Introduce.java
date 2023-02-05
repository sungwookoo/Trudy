package com.ssafy.trudy.member.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "introduces")
@JsonIgnoreProperties("hibernateLazyInitializer")
public class Introduce {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String plan;

    private String self;

    @Column(length = 45)
    private String language;
}
