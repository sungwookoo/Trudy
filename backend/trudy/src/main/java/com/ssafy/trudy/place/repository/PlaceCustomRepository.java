package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;

import java.util.List;

public interface PlaceCustomRepository {

    // 1-1) 지역시군구 값 X, 콘텐츠 타입 X, 키워드 X
    List<Place> findByPage(int limit, int offset);
}
