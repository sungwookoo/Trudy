package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
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

    // 필터된 위치 정보를 받기(from DB)
    // 중간에 컨텐츠아이디와 컨텐츠내용과의 매핑이 필요함 -> 서비스에서할까...?
    public List<Place> findPlaceListFiltered(String[][] areaSigungu, String[] contentTypeId) {
        String jpql = "select m from Place m ";
        // 1차 필터 더하기
        switch(areaSigungu.length) {
            case 0 : jpql += "where ";
                    break;
            case 1 : jpql += "where (m.areacode =: areaSigungu[0][0] and m.sigungucode =: areaSigungu[0][1])";
                    break;
//            case 2 : jpql += "where (m.areacode =: areaSigungu[0][0] and m.sigungucode =: areaSigungu[0][1]" + "or " + "m.areacode =: areaSigungu[1][0] and m.sigungucode =: areaSigungu[1][1])";
//                    break;
//            case 3 : jpql += "where (m.areacode =: areaSigungu[0][0] and m.sigungucode =: areaSigungu[0][1]" + "or " + "m.areacode =: areaSigungu[1][0] and m.sigungucode =: areaSigungu[1][1]" + "or " + "m.areacode =: areaSigungu[2][0] and m.sigungucode =: areaSigungu[2][1])";
//                    break;
//            case 4 : jpql += "where (m.areacode =: areaSigungu[0][0] and m.sigungucode =: areaSigungu[0][1]" + "or " +
//                    break;
//            case 5 : jpql += "where (m.areacode =: areaSigungu[0][0] and m.sigungucode =: areaSigungu[0][1]" + "or " +
//                    break;
        }
        if(areaSigungu.length > 0) {
            jpql += "and ";
        }
        switch(contentTypeId.length) {
            case 0 : break;
            case 1 : jpql += "(m.contenttypeid =: contentTypeId[0])";
                    break;
            case 2 : jpql += "(m.contenttypeid =: contentTypeId[0]" + "or " + "m.contenttypeid =: contentTypeId[1])";
                    break;
            case 3 : jpql += "(m.contenttypeid =: contentTypeId[0]" + "or " + "m.contenttypeid =: contentTypeId[1]" + "or " + "m.contenttypeid =: contentTypeId[2])";
                    break;
            case 4 : jpql += "(m.contenttypeid =: contentTypeId[0]" + "or " + "m.contenttypeid =: contentTypeId[1]" + "or " + "m.contenttypeid =: contentTypeId[2])" + "or" + "m.contenttypeid =: contentTypeId[3])";
                    break;
        }
        return em.createQuery(jpql, Place.class).getResultList();
    }

    public List<Place> findPlaceListSearch(String title) {
        return em.createQuery("select p from Place p where p.title like title", Place.class).getResultList();
    }

    public List<Place> findPlace(Long id) {
        return em.createQuery("select p from Place p where p.id = id", Place.class).getResultList();
    }

//    public List<Place> findByNameContaingTitle(String keyword);

    public List<Place> searchPlaceFilter(String keyword) {;
        return em.createQuery("select p from Place p where p.title like :cash", Place.class)
                .setParameter("cash", "%" + keyword + "%")
                .getResultList();
    }
}
