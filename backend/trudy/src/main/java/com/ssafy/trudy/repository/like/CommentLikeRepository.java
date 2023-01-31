package com.ssafy.trudy.repository.like;

import com.ssafy.trudy.model.like.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
