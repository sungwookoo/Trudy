package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;

import java.util.List;

public interface PlaceCustomRepository {

    List<Place> findPlaceListByCategory(int offset, int limit, String[][] areaSigungu, String[] contentTypeId);

    // 전체 중에서
    List<Place> findByPage(int limit, int offset);
}
