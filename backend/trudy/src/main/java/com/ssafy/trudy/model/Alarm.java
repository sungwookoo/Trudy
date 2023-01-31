package com.ssafy.trudy.model;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "alarm")
public class Alarm {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @Column(length = 45)
    private String type;

    @Column(name = "target_id")
    private String targetId;

    @Column(name = "is_checked")
    private boolean isChecked;
}

