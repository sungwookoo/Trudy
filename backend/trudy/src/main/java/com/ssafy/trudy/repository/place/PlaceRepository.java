package com.ssafy.trudy.repository.place;

import com.ssafy.trudy.model.place.Place;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;

@Repository
public class PlaceRepository {
    @PersistenceContext
    private EntityManager em;

    // 모든 위치 정보를 받기
    public List<Place> findPlaceList() {
        return em.createQuery("select p from Place p", Place.class)
                .getResultList();
    }
}
