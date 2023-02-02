package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.NestedComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentRepository extends JpaRepository<NestedComment, Long> {
}
