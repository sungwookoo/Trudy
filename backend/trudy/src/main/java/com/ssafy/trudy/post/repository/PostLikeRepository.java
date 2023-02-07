package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    public int countByPostId(Post postId);

    PostLike findByMemberIdAndPostId(Member memberEntity, Post postEntity);
}
