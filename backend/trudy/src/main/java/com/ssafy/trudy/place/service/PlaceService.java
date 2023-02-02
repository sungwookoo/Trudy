package com.ssafy.trudy.place.service;

import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlaceService {

    @Autowired
    PlaceRepository placeRepository;

    public List<Place> findPlaceList() {
        return placeRepository.findPlaceList();
    }
    public List<Place> findPlaceListFiltered(String[][] areaSigungu, String[] contentTypeId) {
        return placeRepository.findPlaceListFiltered(areaSigungu, contentTypeId);
    }
    public List<Place> findPlaceListSearch(String title) {
        return placeRepository.findPlaceListSearch(title);
    }

    public List<Place> findPlace(Long id) { return placeRepository.findPlace(id); }

    public List<Place> searchPlaceFilter(String keyword) {
        return placeRepository.searchPlaceFilter(keyword);
    }
}
