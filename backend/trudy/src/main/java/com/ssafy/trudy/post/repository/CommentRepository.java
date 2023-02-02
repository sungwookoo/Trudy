package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
