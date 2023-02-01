package com.ssafy.trudy.bookmark;

import com.ssafy.trudy.place.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookmarkService {

    //북마크 추가
    private final BookmarkRepository bookmarkRepository;

    public void addBookmark(){

    }

    //북마크한 places 리스트 가져오기
    public void findBookmarkList(){

    }

}
