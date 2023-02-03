package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceCustomRepository {

    // 쿼리 파라미터로 넘어온 값이 페이지 정보로 만들어 진다.
    // 1-1) 지역시군구 값 X, 콘텐츠 타입 X, keyword X
    List<Place> findAll();

    // 1-2) 지역시군구 값 X, 콘텐츠 타입 X, keyword O
    List<Place> findPlacesByTitleContaining(String keyword);

    // 2-1) 지역시군구 값 O, 콘텐츠 타입 X, keyword X
    // **areacode로 찾음

    // 2-2) 지역시군구 값 O, 콘텐츠 타입 X, keyword O
    List<Place> findPlacesByAreacodeAndSigungucodeAndTitleContaining(String areacode, String sigungucode, String keyword);

    // 2-2-x) 지역값만 O with keyword
    List<Place> findPlacesByAreacodeAndTitleContaining(String areacode, String keyword);

    // 3-1) 지역 시군구 값 X, 콘텐츠 타입 O, keyword X
    List<Place> findPlacesByContenttypeid(String contenttypeid);

    // 3-2) 지역 시군구 값 X, 콘텐츠 타입 O, keyword O
    List<Place> findPlacesByContenttypeidAndTitleContaining(String contenttypeid, String keyword);

    // 4번은 이중 for문이다.
    // 4-1) 지역 시군구 값 O, 콘텐츠 타입 O, keyword X
    // 4-1-x) 지역값으로 O, 콘텐츠 타입 O, keyword X
    List<Place> findPlacesByAreacodeAndContenttypeid(String areacode, String contenttypeid);
    // 4-1-o) 지역 시군구 값 O, 콘텐츠 타입 O, keyword X
    List<Place> findPlacesByAreacodeAndSigungucodeAndContenttypeid(String areacode, String sigungucode, String contenttypeid);

    // 4-2) 지역 시군구 값 O, 콘텐츠 타입 O, keyword O
    // 4-2-x) 지역값으로 O, 콘텐츠 타입 O, keyword O
    List<Place> findPlacesByAreacodeAndContenttypeidAndTitleContaining(String areacode, String contenttypeid, String keyword);
    // 4-2-o) 지역 시군구 값 O, 콘텐츠 타입 O, keyword O
    List<Place> findPlacesByAreacodeAndSigungucodeAndContenttypeidAndTitleContaining(String areacode, String sigungucode, String contenttypeid, String keyword);

    // **areacode로 장소찾기
    List<Place> findPlacesByAreacode(String areacode);

    // **areacode,sigungu로 장소찾기
    List<Place> findPlacesByAreacodeAndSigungucode(String areacode, String sigungucode);
}
