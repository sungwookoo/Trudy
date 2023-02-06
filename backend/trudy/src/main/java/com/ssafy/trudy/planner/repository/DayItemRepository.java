package com.ssafy.trudy.planner.repository;

import com.ssafy.trudy.planner.model.Day;
import com.ssafy.trudy.planner.model.DayItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayItemRepository extends JpaRepository<DayItem, Long> {

    List<DayItem> findByDayIdOrderBySequenceAsc(Day dayId);
    DayItem findDayItemById(Long dayItemId);
}
