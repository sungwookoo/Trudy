package com.ssafy.trudy.like.repository;

import com.ssafy.trudy.like.model.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
