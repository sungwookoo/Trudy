package com.ssafy.trudy.controller;

import com.ssafy.trudy.model.place.Place;
import com.ssafy.trudy.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("/")
    public Result places() {
        List<Place> findPlaces = placeService.findPlaceList();
        // 엔티티 -> DTO 변환
        List<PlacesDto> collect = findPlaces.stream()
                .map(p -> new PlacesDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class PlacesDto {
        private Long id;
        private String addr1;
        private String addr2;
        private String areaCode;
        private String cat1;
        private String cat2;
        private String cat3;
        private String contentId;
        private String contentTypeId;
        private String createdtTime;
        private String firstImage;
        private String firstImage2;
        private String mapx;
        private String mapy;
        private String mlevel;
        private String modifiedTime;
        private String readCount;
        private String sigunguCode;
        private String tel;
        private String title;
        private String zipcode;
    }


}