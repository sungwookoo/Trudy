package com.ssafy.trudy.place.service;


import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;

    // 키워드로 찾기 - pagenation clear
    public List<PlaceDto> findPlaceListByTitle(String offs, String lmt, String keyword) {
        List<Place> placeListByTitle = Optional.ofNullable(placeRepository.findPlacesByTitleContaining(keyword)).orElseThrow(() -> new BadCredentialsException("해당 키워드의 장소를 찾을 수 없습니다."));
        int offset = Integer.parseInt(offs);
        int limit = Integer.parseInt(lmt);
        try {
            placeListByTitle = placeListByTitle.subList(offset, offset + limit);
        } catch (Exception e) {
            placeListByTitle = placeListByTitle.subList(offset, placeListByTitle.size() - 1);
        }
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

    // 카테고리 클릭 서칭 - pagenation clear
    public List<PlaceDto> findPlaceListByCategory(String offs, String lmt, String areaSigunguCash, String contentTypeIdCash) {
        // offset - page 개념, limit - 나올 게시물 갯수
        List<Place> placeListByCategory = new ArrayList<>();
        int offset = Integer.parseInt(offs);
        int limit = Integer.parseInt(lmt);

        // 입력값이 null인 경우를 대비해서 만듦
        if(areaSigunguCash.length() == 0 && contentTypeIdCash.length() == 0) {
            placeListByCategory = placeRepository.findByPage(offset, limit);

        } else if (areaSigunguCash.length() != 0 && contentTypeIdCash.length() == 0) {
            String[][] areaSigungu = parseFunction(areaSigunguCash);
            for(int i = 0; i < areaSigungu.length; i++) {
                placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucode(areaSigungu[i][0], areaSigungu[i][1]));
            }
            try {
                placeListByCategory = placeListByCategory.subList(offset, offset + limit);
            } catch (Exception e) {
                placeListByCategory = placeListByCategory.subList(offset, placeListByCategory.size() - 1);
            }
        } else if (areaSigunguCash.length() == 0) {
            // && contentTypeIdCahs != 0 인 경우이다.(논리상 축약가능)
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            for(int i = 0; i < contentTypeId.length; i++) {
                placeListByCategory.addAll(placeRepository.findPlacesByContenttypeid(contentTypeId[i]));
            }
            try {
                placeListByCategory = placeListByCategory.subList(offset, offset + limit);
            } catch (Exception e) {
                placeListByCategory = placeListByCategory.subList(offset, placeListByCategory.size() - 1);
            }
        } else {
            // 모든 값이 들어온 경우
            String[][] areaSigungu = parseFunction(areaSigunguCash);
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            placeListByCategory = Optional.ofNullable(placeRepository.findPlaceListByCategory(offset, limit, areaSigungu, contentTypeId)).orElseThrow(() -> new BadCredentialsException("없습니다."));
        }
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

    // String -> String[][]
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

    // String -> String[]
    public String[] parseFunction2(String input) {
        String[] result = Arrays.stream(input.substring(1, input.length() - 1).split(","))
                .map(String::trim)
                .toArray(String[]::new);
        return result;
    }
}
