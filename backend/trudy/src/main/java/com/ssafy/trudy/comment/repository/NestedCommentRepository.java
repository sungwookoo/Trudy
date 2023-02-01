package com.ssafy.trudy.comment.repository;

import com.ssafy.trudy.comment.model.NestedComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentRepository extends JpaRepository<NestedComment, Long> {
}
