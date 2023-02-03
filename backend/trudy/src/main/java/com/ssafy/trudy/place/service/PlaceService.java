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

    // 카테고리 검색 전체
    public List<PlaceDto> findPlaceListByCategory(String offs, String lmt, String areaSigunguCash, String contentTypeIdCash, String keyword) {
        // offset - page 개념, limit - 나올 게시물 갯수
        List<Place> placeListByCategory = new ArrayList<>();
        int offset = Integer.parseInt(offs);
        int limit = Integer.parseInt(lmt);

        // 1) 지역시군구 값 X, 콘텐츠 타입 값 X
        if(areaSigunguCash.length() == 0 && contentTypeIdCash.length() == 0) {
            // 1-1) keyword X
            if(keyword.length() == 0) {
                placeListByCategory = placeRepository.findAll();
            // 1-2) keyword O
            } else {
                placeListByCategory = placeRepository.findPlacesByTitleContaining(keyword);
            }

        // 2) 지역시군구 값 O, 콘텐츠 타입 값 X
        } else if (areaSigunguCash.length() != 0 && contentTypeIdCash.length() == 0) {
            String[][] areaSigungu = parseFunction(areaSigunguCash);
            // 2-1) keyword X -> 지역 시군구로만 찾기
            if(keyword.length() == 0) {
                for (String[] strings : areaSigungu) {
                    // 2-1-x) sigungucode = 100이 들어올 경우, areacode로 판단해서 더하기
                    if (strings[1].equals("100")) {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacode(strings[0]));
                    // 2-1-o) sigungucode가 정상적으로 들어올 경우, areacode와 sigungucode로 판단하기
                    } else {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucode(strings[0], strings[1]));
                    }
                }
            // 2-2) keyword O -> 지역 시군구 & keyword
            } else {
                for (String[] strings : areaSigungu) {
                    // 2-2-x) sigungucode = 100이 들어올 경우, areacode와 keyword로 판단해서 더하기
                    if (strings[1].equals("100")) {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreaCodeAndTitleContaining(strings[0], keyword));
                    // 2-2-o) sigungucode가 정상적으로 들어올 경우, areacode와 sigungucode와 keyword로 판단하기
                    } else {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndTitleContaining(strings[0], strings[1], keyword));
                    }
                }
            }

        // 3) 지역 시군구 값 X, 콘텐츠 타입 값 O
        } else if (areaSigunguCash.length() == 0 && contentTypeIdCash.length() != 0) {
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            // 3-1) keyword X -> 콘텐츠 타입만으로
            if(keyword.length() == 0) {
                for (String s : contentTypeId) {
                    placeListByCategory.addAll(placeRepository.findPlacesByContenttypeid(s));
                }
            // 3-2) keyword O -> 콘텐츠 타입 & keyword
            } else {
                for (String s : contentTypeId) {
                    placeListByCategory.addAll(placeRepository.findPlacesByContenttypeidAndTitleContaining(s, keyword));
                }
            }

        // 4) 지역 시군구 값 O, 콘텐츠 타입 값 O
        } else {
            String[][] areaSigungu = parseFunction(areaSigunguCash);
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            // 4-1) keyword X -> 지역 시군구 값 & 콘텐츠 타입 값
            if(keyword.length() == 0) {
                for (String[] strings : areaSigungu) {
                    // 4-1-x) sigungucode = 100이 들어온 경우, areacode와 컨텐츠타입으로 하기
                    if (strings[1].equals("100")) {
                        for (String s : contentTypeId) {
                            placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndContenttypeid(strings[0], s));
                        }
                        // 4-1-o) sigungucode가 정상적으로 들어온 경우, areacode & sigungucode & contenttypeid
                    } else {
                        for (String s : contentTypeId) {
                            placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndContenttypeid(strings[0], strings[0], s));
                        }
                    }
                }
            // 4-2) keyword O -> 지역 시군구 값 & 콘텐츠 타입 값 & 키워드
            } else {
                for (int i = 0; i < areaSigungu.length; i++) {
                    // 4-2-x) sigungucode = 100이 들어온 경우, areacode와 컨텐츠타입과 키워드로 하기
                    if (areaSigungu[i][1].equals("100")) {
                        for (int j = 0; j < contentTypeId.length; j++) {
                            placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndContenttypeidAndTitleContaining(areaSigungu[i][0], contentTypeId[j], keyword));
                        }
                    // 4-2-o) sigungu가 정상적으로 들어온 경우, areacode & sigungucode & cotenttypeid & keyword
                    } else {
                        for (int j = 0; j < contentTypeId.length; j++) {
                            placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndContenttypeidAndTitleContaining(areaSigungu[i][0], areaSigungu[i][1], contentTypeId[j], keyword));
                        }
                    }
                }
            }
        }

        // pagenation 리스트 갯수 한정해서 보내기
        try {
            placeListByCategory = placeListByCategory.subList(offset, offset + limit);
        } catch (Exception e) {
            placeListByCategory = placeListByCategory.subList(offset, placeListByCategory.size());
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
