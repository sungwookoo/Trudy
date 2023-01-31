package com.ssafy.trudy.repository;

import com.ssafy.trudy.model.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}
