package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.NestedCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentLikeRepository extends JpaRepository<NestedCommentLike, Long> {
}
