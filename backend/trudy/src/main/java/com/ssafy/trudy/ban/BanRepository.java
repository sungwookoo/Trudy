package com.ssafy.trudy.ban;

import com.ssafy.trudy.ban.Ban;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BanRepository extends JpaRepository<Ban, Long> {
}
