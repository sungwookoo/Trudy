package com.ssafy.trudy.place.controller;

import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.service.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // 1) 초기 조회, 전체 조회
//    @GetMapping("")
//    public List<PlaceDto> findAllPlace() {
//        return placeService.findAll();
//    }

    // 2) 클릭해서 하나의 관광지 선택
//    @GetMapping("/search/")


    // 3) 돋보기 눌러서 서칭
    @GetMapping("/search/{keyword}")
    @ResponseBody
    public List<PlaceDto> findPlaceListByTitle(@PathVariable String keyword) {
        return placeService.findPlaceListByTitle(keyword);
    }

    // 4) 관광지 정보 클릭할 때 필터링
    @GetMapping("/filter")
    @ResponseBody
    public List<PlaceDto> findPlaceListByCategory(@RequestParam String areaSigun, @RequestParam String contentTypeIdd) {
        String[][] areaSigungu = parseFunction(areaSigun);
        String[] contentTypeId = parseFunction2(contentTypeIdd);
        return placeService.findPlaceListByCategory(areaSigungu, contentTypeId);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    public String[][] parseFunction(String input) {
        // Remove square brackets from start and end of input string
        input = input.substring(1, input.length() - 1);
        input = input.substring(1, input.length() - 1);

        // Split input string into rows
        String[] rows = input.split("\\], \\[");

        // Split each row into individual values
        String[][] array = new String[rows.length][];
        for (int i = 0; i < rows.length; i++) {
            array[i] = rows[i].split(", ");
        }
        return array;
    }

    public String[] parseFunction2(String input) {
        String[] result = Arrays.stream(input.substring(1, input.length() - 1).split(","))
                .map(String::trim)
                .toArray(String[]::new);
        return result;
    }

    public class PlacesFilterResponse {
        private List<PlaceDto> places;

        public PlacesFilterResponse(List<PlaceDto> places) {
            this.places = places;
        }

        public List<PlaceDto> getPlaces() {
            return places;
        }

        public void setPlaces(List<PlaceDto> places) {
            this.places = places;
        }
    }
}