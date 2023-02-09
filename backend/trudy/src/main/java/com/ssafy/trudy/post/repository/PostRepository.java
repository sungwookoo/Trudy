package com.ssafy.trudy.post.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.post.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    List<Post> findAllByMemberId(Member member);

    List<Post> findAllByMemberIdIn(List<Long> memberIds);
}
