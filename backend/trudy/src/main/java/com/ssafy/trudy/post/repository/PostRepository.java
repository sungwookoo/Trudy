package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, SearchPostRepository {
    List<Post> findAllByMemberId(Long memberId);

    List<Post> findAllByMemberIdIn(List<Long> memberIds);
}
