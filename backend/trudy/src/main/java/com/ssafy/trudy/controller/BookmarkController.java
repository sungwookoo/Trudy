package com.ssafy.trudy.controller;

import com.ssafy.trudy.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void bookmarkList(){

    }

}
