package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
}
