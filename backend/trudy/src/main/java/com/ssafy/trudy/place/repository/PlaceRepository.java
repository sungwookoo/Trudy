package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.*;

@Repository
public class PlaceRepository {
    @PersistenceContext
    private EntityManager em;


    /**
     * findPlaceList
     * 처음 지도 칸을 누를 때, 혹은 필터링에서 All 누를 떄
     * 모든 장소 정보를 제공한다.
     */
    public List<Place> findPlaceList() {
        return em.createQuery("select p from Place p", Place.class)
                .getResultList();
    }

    /**
     * findPlaceListFiltered
     * [[areacode, sigungucode], [], [] ...]
     * [contentTypeId, contentTypeId2, 3, 4]
     * 필터링 기능을 구현
     * @return 필터 후 장소들의 목록
     */
    public List<Place> findPlaceListFiltered(String[][] areaSigungu, String[] contentTypeId) {
        String jpql = "select m from Place m ";
gi
        // Build areaSigungu filter
        if (areaSigungu.length > 0) {
            jpql += "where (";
            for (int i = 0; i < areaSigungu.length; i++) {
                if (i > 0) {
                    jpql += " or ";
                }
                jpql += "(m.areacode =: areaSigungu_" + i + " and m.sigungucode =: sigungu_" + i + ")";
            }
            jpql += ") ";
        }

        // Build contentTypeId filter
        if (contentTypeId.length > 0) {
            if (areaSigungu.length > 0) {
                jpql += "and ";
            } else {
                jpql += "where ";
            }
            jpql += "(";
            for (int i = 0; i < contentTypeId.length; i++) {
                if (i > 0) {
                    jpql += " or ";
                }
                jpql += "m.contenttypeid =: contentTypeId_" + i;
            }
            jpql += ")";
        }

        // Create query and set parameters
        TypedQuery<Place> query = em.createQuery(jpql, Place.class);
        for (int i = 0; i < areaSigungu.length; i++) {
            query.setParameter("areaSigungu_" + i, areaSigungu[i][0]);
            query.setParameter("sigungu_" + i, areaSigungu[i][1]);
        }
        for (int i = 0; i < contentTypeId.length; i++) {
            query.setParameter("contentTypeId_" + i, contentTypeId[i]);
        }
        return query.getResultList();
    }

    public List<Place> findPlaceListSearch(String title) {
        return em.createQuery("select p from Place p where p.title like title", Place.class).getResultList();
    }

    /**
     * findPlace
     * id로 특정 지역을 찾는다.
     */
    public List<Place> findPlace(Long id) {
        return em.createQuery("select p from Place p where p.id = id", Place.class).getResultList();
    }

    public List<Place> searchPlaceFilter(String keyword) {;
        return em.createQuery("select p from Place p where p.title like :cash", Place.class)
                .setParameter("cash", "%" + keyword + "%")
                .getResultList();
    }
}
