package com.ssafy.trudy.place.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.trudy.member.model.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@Table(name = "bookmarks")
@NoArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @ManyToOne
    @JoinColumn(name = "place_id")
    @JsonIgnore
    private Place placeId;

    public Bookmark(Member memberId, Place placeId) {
        this.memberId = memberId;
        this.placeId = placeId;
    }

    public static Bookmark createBookmark(Member memberId, Place placeId) {
        return new Bookmark(memberId, placeId);
    }
}
