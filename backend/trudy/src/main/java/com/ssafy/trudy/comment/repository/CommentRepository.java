package com.ssafy.trudy.comment.repository;

import com.ssafy.trudy.comment.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
