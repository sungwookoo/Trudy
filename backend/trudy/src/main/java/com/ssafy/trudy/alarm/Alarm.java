package com.ssafy.trudy.alarm;

import com.ssafy.trudy.member.model.Member;
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
    private int targetId;

    @Column(name = "is_checked")
    private byte isChecked;
}

/*
자바 Long -> 디비의 bigint 로 수정
자바 boolean -> 자바 byte로 수정
자바 foreign key type ->디비의 bigint로 수정
 */