package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class PlaceCustomRepositoryImpl implements PlaceCustomRepository{
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Place> findPlaceListByCategory(String[][] areaSigungu, String[] contentTypeId) {
        String jpql = "select m from Place m ";

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
}
