package com.ssafy.trudy.place.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "bookmarks")
public class Bookmark {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place placeId;
}
