package com.ssafy.trudy.repository.place;

import com.ssafy.trudy.model.place.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
