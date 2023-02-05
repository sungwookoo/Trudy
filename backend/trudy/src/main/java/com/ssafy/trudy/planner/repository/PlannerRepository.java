package com.ssafy.trudy.planner.repository;

import com.ssafy.trudy.planner.model.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    Planner getPlannerById(Long id);
}
