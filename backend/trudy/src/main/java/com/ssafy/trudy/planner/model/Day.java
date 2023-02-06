package com.ssafy.trudy.planner.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@Table(name = "days")
@NoArgsConstructor
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

    public Day(Planner plannerId, String day, String memo){
        this.plannerId = plannerId;
        this.day = day;
        this.memo = memo;
    }
}
