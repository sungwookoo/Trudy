package com.ssafy.trudy.planner.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@Table(name = "days")
@NoArgsConstructor
@AllArgsConstructor
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
