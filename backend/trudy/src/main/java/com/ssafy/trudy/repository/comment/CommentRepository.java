package com.ssafy.trudy.repository.comment;

import com.ssafy.trudy.model.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
