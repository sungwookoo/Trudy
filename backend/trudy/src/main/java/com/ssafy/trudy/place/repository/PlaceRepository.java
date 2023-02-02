package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, PlaceCustomRepository {

    // 제목에서 키워드로 찾기
    List<Place> findPlacesByTitleContaining(String keyword);

    // 하나의 장소 검색
    Place findPlaceById(Long id);
}
