package com.ssafy.trudy.member.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "follow")
public class Follow {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follow_from")
    private Member followFrom;

    @ManyToOne
    @JoinColumn(name = "follow_to")
    private Member followTo;

}
