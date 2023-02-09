package com.ssafy.trudy.member.service;

import com.ssafy.trudy.member.model.Member;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

public interface MemberSpecification {

    public static Specification<Member> getSearchByPageable(String name, String gender, String areaCode, String sigunguCode, String isLocal) {
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (name != null && !name.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + name + "%"));
            }

            if (gender != null && !gender.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("gender"), gender));
            }

            if (areaCode != null && !areaCode.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("areaCode"), areaCode));
            }

            if (sigunguCode != null && !sigunguCode.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("sigunguCode"), sigunguCode));
            }

            if (isLocal != null && !isLocal.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("isLocal"), isLocal));
            }

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("isPublic"), "1"));

            return predicate;
        };
    }
}