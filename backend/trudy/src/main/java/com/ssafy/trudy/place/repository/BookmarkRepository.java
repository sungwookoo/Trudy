package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Bookmark;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.model.PlaceDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long>, BookmarkCustomRepository {

    List<Place>
}
