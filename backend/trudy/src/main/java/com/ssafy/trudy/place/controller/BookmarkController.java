package com.ssafy.trudy.place.controller;

import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.config.web.servlet.oauth2.login.OAuth2LoginSecurityMarker;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmark")
@Slf4j
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    //북마크 추가
    @PostMapping("{member_id}/{place_id}")
    public void bookmarkAdd(){

    }

    //북마크한 places 리스트 가져오기
    @GetMapping("/{member_id}")
    public void bookmarkList(@PathVariable String memberId){
        List<PlaceDto> findBookmarkList(memberId);
    }

}
