package com.ssafy.trudy.repository.post;

import com.ssafy.trudy.model.post.PostCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategory, Long> {
}
