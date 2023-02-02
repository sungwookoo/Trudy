package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
