package com.ssafy.trudy.service;

import com.ssafy.trudy.model.place.Place;
import com.ssafy.trudy.repository.place.PlaceRepository;
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
}
