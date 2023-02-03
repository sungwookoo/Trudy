package com.ssafy.trudy.place.repository;

import com.ssafy.trudy.place.model.Place;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;


public class PlaceCustomRepositoryImpl implements PlaceCustomRepository{
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Place> findByPage(int offset, int limit) {
        String jpql = "select p from Place p";
        TypedQuery<Place> query = em.createQuery(jpql, Place.class)
                .setFirstResult(offset)
                .setMaxResults(limit);

        return query.getResultList();
    }
}
