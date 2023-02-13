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

    @Column
    private String memo;

    @Column
    private String sequence;

    public Day(Planner plannerId, String day, String memo, String sequence){
        this.plannerId = plannerId;
        this.day = day;
        this.memo = memo;
        this.sequence = sequence;
    }
}
