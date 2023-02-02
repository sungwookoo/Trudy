package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
}
