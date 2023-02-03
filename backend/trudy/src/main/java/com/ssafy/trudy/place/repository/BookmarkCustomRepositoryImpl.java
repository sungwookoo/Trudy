package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.place.model.Place;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

public class BookmarkCustomRepositoryImpl implements BookmarkCustomRepository{

//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    @Override
    public List<Place> findBookmarkList() {
//        Member user = (Member) authentication.getPrincipal();
//        Long userId = user.getId();


    }
}
