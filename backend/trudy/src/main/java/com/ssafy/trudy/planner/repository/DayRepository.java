package com.ssafy.trudy.planner.repository;

import com.ssafy.trudy.planner.model.Day;
import com.ssafy.trudy.planner.model.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayRepository extends JpaRepository<Day, Long> {
    Day findDayById(Long id);
    List<Day> findByPlannerIdOrderByDay(Planner plannerId);
}
