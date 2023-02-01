package com.ssafy.trudy.like.repository;

import com.ssafy.trudy.like.model.NestedCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentLikeRepository extends JpaRepository<NestedCommentLike, Long> {
}
