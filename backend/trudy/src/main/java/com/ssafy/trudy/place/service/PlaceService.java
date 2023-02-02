package com.ssafy.trudy.place.service;


import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.repository.PlaceCustomRepository;
import com.ssafy.trudy.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final PlaceCustomRepository placeCustomRepository;

    // 키워드로 찾기
    public List<PlaceDto> findPlaceListByTitle(String keyword) {
        List<Place> placeListByTitle = Optional.ofNullable(placeRepository.findPlacesByTitleContaining(keyword)).orElseThrow(() -> new BadCredentialsException("해당 키워드의 장소를 찾을 수 없습니다."));
        return placeListByTitle.stream().map(place -> PlaceDto.builder()
                .id(place.getId())
                .addr1(place.getAddr1())
                .addr2(place.getAddr2())
                .areacode(place.getAreacode())
                .contenttypeid(place.getContenttypeid())
                .firstimage(place.getFirstimage())
                .firstimage2(place.getFirstimage2())
                .mapx(place.getMapx())
                .mapy(place.getMapy())
                .sigungucode(place.getSigungucode())
                .tel(place.getTel())
                .title(place.getTitle())
                .zipcode(place.getZipcode())
                .build()).collect(Collectors.toList());
    }

    // 카테고리 클릭 서칭
    public List<PlaceDto> findPlaceListByCategory(String[][] areaSigungu, String[] contentTypeId) {
        List<Place> placeListByCategory = Optional.ofNullable(placeCustomRepository.findPlaceListByCategory(areaSigungu, contentTypeId)).orElseThrow(() -> new BadCredentialsException("없습니다."));
        return placeListByCategory.stream().map(place -> PlaceDto.builder()
                .id(place.getId())
                .addr1(place.getAddr1())
                .addr2(place.getAddr2())
                .areacode(place.getAreacode())
                .contenttypeid(place.getContenttypeid())
                .firstimage(place.getFirstimage())
                .firstimage2(place.getFirstimage2())
                .mapx(place.getMapx())
                .mapy(place.getMapy())
                .sigungucode(place.getSigungucode())
                .tel(place.getTel())
                .title(place.getTitle())
                .zipcode(place.getZipcode())
                .build()).collect(Collectors.toList());
    }

    public PlaceDto findPlaceById(Long id) {
        Place place = Optional.ofNullable(placeRepository.findPlaceById(id)).orElseThrow(() -> new BadCredentialsException("해당하는 장소를 찾을 수 없습니다."));
        return PlaceDto.builder()
                .id(place.getId())
                .addr1(place.getAddr1())
                .addr2(place.getAddr2())
                .areacode(place.getAreacode())
                .contenttypeid(place.getContenttypeid())
                .firstimage(place.getFirstimage())
                .firstimage2(place.getFirstimage2())
                .mapx(place.getMapx())
                .mapy(place.getMapy())
                .sigungucode(place.getSigungucode())
                .tel(place.getTel())
                .title(place.getTitle())
                .zipcode(place.getZipcode())
                .build();
    }
}
