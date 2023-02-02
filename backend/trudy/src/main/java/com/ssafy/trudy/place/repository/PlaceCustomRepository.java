package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;

import java.util.List;

public interface PlaceCustomRepository {
    List<Place> findPlaceListByCategory(String[][] areaSigungu, String[] contentTypeId);
}
