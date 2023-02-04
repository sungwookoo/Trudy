package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.NestedComment;
import com.ssafy.trudy.post.model.NestedCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;
import java.util.Optional;

public interface NestedCommentRepository extends JpaRepository<NestedComment, Long> {


}
