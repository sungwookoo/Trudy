package com.ssafy.trudy.place.service;

//import com.ssafy.trudy.place.repository.BookmarkRepository;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.place.model.Bookmark;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookmarkService {

    @Autowired
    private final BookmarkRepository bookmarkRepository;

    // 회원정보로부터 북마크한 장소id들을 찾기
    public List<Long> findBookmarksByMemberId(Member member) {
        List<Bookmark> bookmarkList = bookmarkRepository.findBookmarksByMemberId(member);
        List<Long> bookmarkedPlaceIdList = new ArrayList<>();
        for(Bookmark bookmark : bookmarkList) {
            // 북마크의 장소 정보에서 장소 id값을 받아오기
            Long placeId = bookmark.getPlaceId().getId();
            bookmarkedPlaceIdList.add(placeId);
        }
        return bookmarkedPlaceIdList;
    }

    // 특정 북마크 조회
    public Bookmark findBookMark(Member memberId, Place placeId) {
        Bookmark bookmark = bookmarkRepository.findBookmarkByMemberIdAndPlaceId(memberId, placeId);
        return bookmark;
    }

    // 북마크 등록
    public Bookmark addBookmark(Bookmark bookmark){
        return bookmarkRepository.save(bookmark);
    }

    // 북마크 삭제
    public void deleteBookmark(Long id){
        bookmarkRepository.deleteById(id);
    }

}
