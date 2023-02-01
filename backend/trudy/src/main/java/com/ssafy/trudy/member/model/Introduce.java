package com.ssafy.trudy.member.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "introduces")
public class Introduce {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    private String title;

    private String plan;

    private String self;

    @Column(length = 45)
    private String language;
}
