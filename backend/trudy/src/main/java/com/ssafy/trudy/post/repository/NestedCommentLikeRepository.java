package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.NestedComment;
import com.ssafy.trudy.post.model.NestedCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NestedCommentLikeRepository extends JpaRepository<NestedCommentLike, Long> {
    NestedCommentLike findByMemberIdAndNestedCommentId(Member memberEntity, NestedComment nestedCommentEntity);

    int countByNestedCommentId(NestedComment nestedCommentEntity);
}
