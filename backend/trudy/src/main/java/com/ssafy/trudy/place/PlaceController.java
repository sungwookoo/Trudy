package com.ssafy.trudy.place;

import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.PlaceService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/place")
@RequiredArgsConstructor
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    // 1) 초기 조회, 전체 조회
    @GetMapping({""})
    public Result places() {
        List<Place> findPlace = placeService.findPlaceList();
        // 엔티티 -> DTO 변환
        List<PlacesDto> collect = findPlace.stream()
                .map(p -> new PlacesDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    // 2) 클릭해서 하나의 관광지 선택
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

    // 3) 돋보기 눌러서 서칭
    @GetMapping("/search/{keyword}")
    @ResponseBody
    public Result placesSearch(@PathVariable String keyword) {
        List<Place> searchPlaceFiltered = placeService.searchPlaceFilter(keyword);
        List<PlacesDto> collect = searchPlaceFiltered.stream()
                .map(p -> new PlacesDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    // 4) 관광지 정보 클릭할 때 필터링
    @GetMapping("/filter")
    @ResponseBody
    public ResponseEntity<PlacesFilterResponse> placesFilter(@RequestParam String areaSigun, @RequestParam String contentTypeIdd) {
        String[][] areaSigungu = parseFunction(areaSigun);
        String[] contentTypeId = parseFunction2(contentTypeIdd);
        List<Place> findPlaceFiltered = placeService.findPlaceListFiltered(areaSigungu, contentTypeId);
        List<PlaceDto> places = findPlaceFiltered.stream()
                .map(p -> new PlaceDto(p.getId(), p.getAddr1(), p.getAddr2(), p.getAreacode(), p.getCat1(), p.getCat2(), p.getCat3(), p.getContentid(), p.getContenttypeid(), p.getCreatedtime(), p.getFirstimage(), p.getFirstimage2(), p.getMapx(), p.getMapy(), p.getMlevel(), p.getModifiedtime(), p.getReadcount(), p.getSigungucode(), p.getTel(), p.getTitle(), p.getZipcode()))
                .collect(Collectors.toList());

        PlacesFilterResponse response = new PlacesFilterResponse(places);
        return ResponseEntity.ok(response);
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

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class PlaceDto {
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