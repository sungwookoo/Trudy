package com.ssafy.trudy.post.service;

import com.ssafy.trudy.post.model.Post;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;

public class PostSpecification {

    public static Specification<Post> getSearchByPageable(String title, String content, String[] sigunguList, String[] categoryList){
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (title != null && !title.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"), "%" + title + "%"));
            }

            if (content != null && !content.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("content"), "%" + content + "%"));
            }

            for(String sigungu : sigunguList){
                if (sigungu != null && !sigungu.isEmpty()) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("sigungu"),  sigungu));
                }
            }

            for(String category : categoryList){
                if (category != null && !category.isEmpty()) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.join(,"category" ), category ));
                }
            }

            return predicate;
        };
    }
}
