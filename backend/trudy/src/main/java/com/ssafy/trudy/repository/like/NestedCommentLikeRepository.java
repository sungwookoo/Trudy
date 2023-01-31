package com.ssafy.trudy.repository.like;

import com.ssafy.trudy.model.like.NestedCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentLikeRepository extends JpaRepository<NestedCommentLike, Long> {
}
