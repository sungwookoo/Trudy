package com.ssafy.trudy.planner.repository;

import com.ssafy.trudy.planner.model.DayItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayItemRepository extends JpaRepository<DayItem, Long> {
}
