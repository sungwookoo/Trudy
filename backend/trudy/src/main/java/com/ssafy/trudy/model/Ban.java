package com.ssafy.trudy.model;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "ban")
public class Ban {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "ban_from")
    private Member banFrom;

    @ManyToOne
    @JoinColumn(name = "ban_to")
    private Member banTo;
}
