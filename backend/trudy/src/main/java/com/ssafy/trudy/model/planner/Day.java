package com.ssafy.trudy.model.planner;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "days")
public class Day {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "planner_id")
    private Planner plannerId;

    @Column(length = 45)
    private String day;

    private String memo;

}
