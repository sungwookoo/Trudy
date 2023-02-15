package com.ssafy.trudy.post.service;

import com.ssafy.trudy.etc.model.Sigungu;
import com.ssafy.trudy.post.model.CategoryName;
import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostArea;
import com.ssafy.trudy.post.model.PostCategory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.List;

public interface PostSpecification {

    public static Specification<Post> getSearchByPageable(String title, String content, List<Long> sigunguList, List<String> categoryList){
        return (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            if (title != null && !title.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("title"), "%" + title + "%"));
            }

            if (content != null && !content.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("content"), "%" + content + "%"));
            }

//            if(categoryList.size() > 0) {
//                for(int i=0; i<categoryList.size(); i++) {
//                    if(i==0) {
//                        predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("postCategoryList").get("categoryName"), categoryList.get(i)));
//                    }
//                    else {
//
//                        predicate = criteriaBuilder.or(predicate, criteriaBuilder.equal(root.get("postCategoryList").get("categoryName"), categoryList.get(i)));
//                    }
//                }
//            }
//            if(categoryList.size() > 0) {
//                Join<Post, PostCategory> join = root.join("postCategory", JoinType.INNER);
//                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(
//                                criteriaBuilder.equal(join.get("name"), "Attraction"),
//                                criteriaBuilder.equal(join.get("name"), "Festival"),
//                                criteriaBuilder.equal(join.get("name"), "Hotel")
//                )
//                );
//            }

            // 되는 코드
            if(categoryList != null && categoryList.size() > 0) {
                Join<Post, PostCategory> join = root.join("postCategoryList", JoinType.INNER);
                Predicate[] predicates = new Predicate[categoryList.size()];
                for(int i=0; i<categoryList.size(); i++) {
                    predicates[i] = criteriaBuilder.equal(join.get("categoryName"), categoryList.get(i));
                }
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(predicates));
            }


//            if(sigunguList.size() > 0) {
//                Join<Post, PostArea> join = root.join("postAreaList", JoinType.INNER);
//                Predicate[] predicates = new Predicate[sigunguList.size()];
//                for(int i=0; i<sigunguList.size(); i++) {
//                    predicates[i] = criteriaBuilder.equal(join.get("sigunguCode"), sigunguList.get(i));
//                }
//                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(predicates));
//            }

//            if(sigunguList.size() > 0) {
//                Join<Post, PostArea> join = root.join("postAreaList", JoinType.INNER);
//                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(join.get("sigunguCode").get("id"), sigunguList.get(0)));
//            }

            if(sigunguList != null && sigunguList.size() > 0) {
                Join<Post, PostArea> joinPostArea = root.join("postAreaList", JoinType.INNER);
                Join<PostArea, Sigungu> joinSigungu = joinPostArea.join("sigunguCode", JoinType.INNER);
                Predicate[] sigunguPredicates = new Predicate[sigunguList.size()];
                for(int i=0; i<sigunguList.size(); i++) {
                    sigunguPredicates[i] = criteriaBuilder.equal(joinSigungu.get("id"), sigunguList.get(i));
                }
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.or(sigunguPredicates));
            }






//            for(Long sigungu : sigunguList){
//                if (sigungu != null) {
//                    /*
//                    Join<Book, Author> authorsBook = root.join("books");
//                    return criteriaBuilder.equal(authorsBook.get("title"), bookTitle);*/
//                    Join<PostArea, Post> PostsPostArea = root.join("postAreaList");
//                    // 아래줄 안되면 맨뒤 sigungu Long 을 postAreaRepository.findById 해서 찾은 거랑 비교하도록하기
//                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(PostsPostArea.get("sigunguCode"),  sigungu));
//                }
//            }
//
//            for(String category : categoryList){
//                if (category != null && !category.isEmpty()) {
//                    Join<PostCategory, Post> postsPostCategory = root.join("postCategoryList");
//                    System.out.println("=======================Specification============================");
//                    //System.out.println(root);
//                    //System.out.println(root.fetch());
//                    System.out.println(postsPostCategory);
//                    // 아래줄 안되면 맨뒤 sigungu Long 을 postAreaRepository.findById 해서 찾은 거랑 비교하도록하기
//                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("categoryName" ), category ));
//                }
//            }

            return predicate;
        };
    }
}
