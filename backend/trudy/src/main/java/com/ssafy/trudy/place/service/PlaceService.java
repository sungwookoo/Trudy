package com.ssafy.trudy.place.service;


import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import com.ssafy.trudy.place.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class PlaceService {

    @Autowired
    private final PlaceRepository placeRepository;

    // id로 검색
    public Place findPlaceById(Long placeId) {
        return placeRepository.findPlaceById(placeId);
    }

    // contentId로 검색
    public Place getByContentId(String contentId) {
        return placeRepository.getByContentid(contentId);
    }

    // List<Long> placeIds(장소 id들)로 부터 List<PlaceDto> 받기
    public List<PlaceDto> findPlacesListByPlaceIds(List<Long> placeIds) {
        List<Place> placeListByPlacesIds = new ArrayList<>();
        // 장소 id로 장소를 찾고 리스트에 추가
        for (Long placeId : placeIds) {
            placeListByPlacesIds.add(findPlaceById(placeId));
        }
        // Dto 변환 후  반환
        return placeListByPlacesIds.stream().map(place -> PlaceDto.builder()
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
            List<String[]> areaSigungu = parseFunction(areaSigunguCash);
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
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndTitleContaining(strings[0], keyword));
                    // 2-2-o) sigungucode가 정상적으로 들어올 경우, areacode와 sigungucode와 keyword로 판단하기
                    } else {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndTitleContaining(strings[0], strings[1], keyword));
                    }
                }
            }

        // 3) 지역 시군구 값 X, 콘텐츠 타입 값 O -> 로직은 단순회 contentType값이 있다는 조건이 자동 true.
        } else if (areaSigunguCash.length() == 0) {
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            List<String> contentTypeIdList = Arrays.asList(contentTypeId);
            // 3-1) keyword X -> 콘텐츠 타입만으로
            if(keyword.length() == 0) {
                placeListByCategory.addAll(placeRepository.findPlacesByContenttypeidIn(contentTypeIdList));
            // 3-2) keyword O -> 콘텐츠 타입 & keyword
            } else {
                placeListByCategory.addAll(placeRepository.findPlacesByContenttypeidInAndTitleContaining(contentTypeIdList, keyword));
            }

        // 4) 지역 시군구 값 O, 콘텐츠 타입 값 O
        } else {
            List<String[]> areaSigungu = parseFunction(areaSigunguCash);
            String[] contentTypeId = parseFunction2(contentTypeIdCash);
            List<String> contentTypeIdList = Arrays.asList(contentTypeId);
            // 4-1) keyword X -> 지역 시군구 값 & 콘텐츠 타입 값
            if(keyword.length() == 0) {
                for (String[] strings : areaSigungu) {
                    // 4-1-x) sigungucode = 100이 들어온 경우, areacode와 컨텐츠타입으로 하기
                    if (strings[1].equals("100")) {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndContenttypeidIn(strings[0], contentTypeIdList));
                    // 4-1-o) sigungucode가 정상적으로 들어온 경우, areacode & sigungucode & contenttypeid
                    } else {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndContenttypeidIn(strings[0], strings[1], contentTypeIdList));
                    }
                }
            // 4-2) keyword O -> 지역 시군구 값 & 콘텐츠 타입 값 & 키워드
            } else {
                for (String[] strings : areaSigungu) {
                    // 4-2-x) sigungucode = 100이 들어온 경우, areacode와 컨텐츠타입과 키워드로 하기
                    if (strings[1].equals("100")) {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndContenttypeidInAndTitleContaining(strings[0], contentTypeIdList, keyword));
                    // 4-2-o) sigungu가 정상적으로 들어온 경우, areacode & sigungucode & cotenttypeid & keyword
                    } else {
                        placeListByCategory.addAll(placeRepository.findPlacesByAreacodeAndSigungucodeAndContenttypeidInAndTitleContaining(strings[0], strings[1], contentTypeIdList, keyword));
                    }
                }
            }
        }

        // pagenation 리스트 갯수 한정해서 보내기
        // 1) 리밋트 갯수를 다 채울만큼 나올 수 있는 경우
        if(placeListByCategory.size() >= offset + limit){
            placeListByCategory = placeListByCategory.subList(offset, offset + limit);
        // 2) 리밋트만 큼 갯수가 나오지 않을 경우
        } else if(placeListByCategory.size() > offset && placeListByCategory.size() < offset + limit) {
            placeListByCategory = placeListByCategory.subList(offset, placeListByCategory.size());
        // 3) 더이상 값이 없을 경우
        } else {
            return null;
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

    // String -> List<String[]>
    public List<String[]> parseFunction(String input) {
        // Remove square brackets from start and end of input string
        String[] elements = input.split(",");
        List<String[]> pairs = new ArrayList<>();
        for(int i = 0; i < elements.length; i += 2){
            String[] pair = { elements[i], elements[i+1]};
            pairs.add(pair);
        }
        return pairs;
    }

    // String -> String[]
    public String[] parseFunction2(String input) {
        String[] result = Arrays.stream(input.split(","))
                .map(String::trim)
                .toArray(String[]::new);
        return result;
    }
}
