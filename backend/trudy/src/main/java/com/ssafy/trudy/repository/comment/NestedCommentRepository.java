package com.ssafy.trudy.repository.comment;

import com.ssafy.trudy.model.comment.NestedComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentRepository extends JpaRepository<NestedComment, Long> {
}
