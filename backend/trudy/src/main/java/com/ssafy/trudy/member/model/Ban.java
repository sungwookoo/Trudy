package com.ssafy.trudy.member.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "ban")
public class Ban {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ban_from")
    private Member banFrom;

    @ManyToOne
    @JoinColumn(name = "ban_to")
    private Member banTo;
}
