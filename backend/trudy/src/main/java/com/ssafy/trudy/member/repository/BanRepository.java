package com.ssafy.trudy.member.repository;

import com.ssafy.trudy.member.model.Ban;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanRepository extends JpaRepository<Ban, Long> {
}
