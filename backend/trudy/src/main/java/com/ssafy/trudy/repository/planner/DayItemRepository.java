package com.ssafy.trudy.repository.planner;

import com.ssafy.trudy.model.planner.DayItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayItemRepository extends JpaRepository<DayItem, Long> {
}
