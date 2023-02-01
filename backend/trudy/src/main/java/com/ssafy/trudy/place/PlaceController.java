package com.ssafy.trudy.place;

import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // 초기 조회, 전체 조회
    @GetMapping({"","/areaAllFilter"})
    public Result places() {
        List<Place> findPlace = placeService.findPlaceList();
        // 엔티티 -> DTO 변환
        List<PlacesDto> collect = findPlace.stream()
                .map(p -> new PlacesDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    // 클릭해서 하나의 관광지 선택
    @GetMapping("/detail")
    public PlacesDto placeOne(@RequestParam String placeId) {
        Long id = Long.parseLong(placeId);
        Place findOnePlace = placeService.findPlace(id).get(0);
        PlacesDto placeDto = new PlacesDto();
        placeDto.id = id;
        placeDto.areacode = findOnePlace.getAreacode();
        placeDto.addr1 = findOnePlace.getAddr1();
        placeDto.addr2 = findOnePlace.getAddr2();
        placeDto.cat1 = findOnePlace.getCat1();
        placeDto.cat2 = findOnePlace.getCat2();
        placeDto.cat3 = findOnePlace.getCat3();
        placeDto.contentId = findOnePlace.getContentid();
        placeDto.contentTypeId = findOnePlace.getContenttypeid();
        placeDto.createdtTime = findOnePlace.getCreatedtime();
        placeDto.firstImage = findOnePlace.getFirstimage();
        placeDto.firstImage2 =findOnePlace.getFirstimage2();
        placeDto.mapx = findOnePlace.getMapx();
        placeDto.mapy = findOnePlace.getMapy();
        placeDto.mlevel = findOnePlace.getMlevel();
        placeDto.modifiedTime = findOnePlace.getModifiedtime();
        placeDto.sigunguCode = findOnePlace.getSigungucode();
        placeDto.tel = findOnePlace.getTel();
        placeDto.title = findOnePlace.getTitle();
        placeDto.zipcode = findOnePlace.getZipcode();
        return placeDto;
    }
    
    @GetMapping("/filter")
    @ResponseBody
    public Result placesFilter(@ModelAttribute String[][] areaSigungu, @ModelAttribute String[] contentTypeId) {
        List<Place> findPlaceFiltered = placeService.findPlaceListFiltered(areaSigungu, contentTypeId);
        // 엔티티 -> DTO 변환
        List<PlacesDto> collect = findPlaceFiltered.stream()
                .map(p -> new PlacesDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @Data
    static class PlaceFilterDto {
        private String[][] areaSigungu;
        private String[] contentTypeId;
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class PlacesDto {
        private Long id;
        private String addr1;
        private String addr2;
        private String areacode;
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