package com.ssafy.trudy.alarm;

import com.ssafy.trudy.alarm.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}
