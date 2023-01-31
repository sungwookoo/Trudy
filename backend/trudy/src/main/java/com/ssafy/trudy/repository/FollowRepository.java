package com.ssafy.trudy.repository;

import com.ssafy.trudy.model.Alarm;
import com.ssafy.trudy.model.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
