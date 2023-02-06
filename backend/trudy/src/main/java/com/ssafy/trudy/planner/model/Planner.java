package com.ssafy.trudy.planner.model;

import com.ssafy.trudy.member.model.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//관계 빼고 다함 $$수정-order명->sequence
@Data
@Entity
@Table(name = "planners")
@NoArgsConstructor
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

    public Planner(Member memberId, String title, String sequence){
        this.memberId = memberId;
        this.title = title;
        this.sequence = sequence;
    }
}
