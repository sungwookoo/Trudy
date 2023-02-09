package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Follow;
import com.ssafy.trudy.member.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Page<Follow> findAllByFollowTo(Member followTo, Pageable pageable);
    Page<Follow> findAllByFollowFrom(Member member, Pageable pageable);
    boolean existsByFollowFromAndFollowTo(Member followFrom, Member followTo);
    Follow findByFollowFromAndFollowTo(Member member, Member targetMember);
}
