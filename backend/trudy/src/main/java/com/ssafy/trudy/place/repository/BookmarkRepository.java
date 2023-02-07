package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.place.model.Bookmark;
import com.ssafy.trudy.place.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    public Bookmark findBookmarkByMemberIdAndPlaceId(Member memberId, Place placeId);

    public List<Bookmark> findBookmarksByMemberId(Member member);
}
