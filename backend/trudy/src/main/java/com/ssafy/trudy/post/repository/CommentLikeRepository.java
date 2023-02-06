package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Comment;
import com.ssafy.trudy.post.model.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {
    CommentLike findByMemberIdAndCommentId(Member memberEntity, Comment commentEntity);

    int countByCommentId(Comment commentEntity);
}
