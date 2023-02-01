package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;

//관계 빼고 다함 $$수정-order명->sequence
@Data
@Entity
@Table(name = "planners")
public class Planner {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    private String title;

    @Column(length = 45)
    private String sequence;
    
}
