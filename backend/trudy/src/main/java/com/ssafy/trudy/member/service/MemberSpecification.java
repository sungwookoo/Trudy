package com.ssafy.trudy.member.service;

import com.ssafy.trudy.member.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

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

            return predicate;
        };
    }
}