package com.ssafy.trudy.place.controller;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.place.model.Bookmark;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.service.BookmarkService;
import com.ssafy.trudy.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.web.servlet.oauth2.login.OAuth2LoginSecurityMarker;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmark")
@Slf4j
@RequiredArgsConstructor
public class BookmarkController {

    @Autowired
    private final BookmarkService bookmarkService;
    @Autowired
    private final MemberService memberService;
    @Autowired
    private final PlaceService placeService;

    // 세션 유저의 북마크 장소 DTO로 반환
    @GetMapping("")
    public List<PlaceDto> bookmarkSearch(@RequestParam Long memberId) {
        Member member = memberService.getById(memberId);
        // 해당하는 북마크의 장소 id 리스트를 받아옴
        List<Long> placeIds = bookmarkService.findBookmarksByMemberId(member);
        // 장소 id 리스트들로부터 place 리스트 정보를 받아오기
        return placeService.findPlacesListByPlaceIds(placeIds);
    }

    // 북마크 추가
    @PostMapping("/post")
    public Bookmark bookmarkAdd(@RequestParam Long memberId, @RequestParam Long placeId) {
        Member member = memberService.getById(memberId);
        Place place = placeService.findPlaceById(placeId);

        Bookmark bookmark = new Bookmark(member, place);
        return bookmarkService.addBookmark(bookmark);
    }

    // 북마크 삭제
    @DeleteMapping("/delete")
    public void bookmarkDelete(@RequestParam Long memberId, @RequestParam Long placeId) {
        Member member = memberService.getById(memberId);
        Place place = placeService.findPlaceById(placeId);

        // 삭제할 북마크 조회
        Bookmark bookmark = bookmarkService.findBookMark(member, place);
        // 북마크 삭제
        bookmarkService.deleteBookmark(bookmark.getId());
    }
}
