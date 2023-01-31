package com.ssafy.trudy.repository;

import com.ssafy.trudy.model.Alarm;
import com.ssafy.trudy.model.Ban;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanRepository extends JpaRepository<Ban, Long> {
}
