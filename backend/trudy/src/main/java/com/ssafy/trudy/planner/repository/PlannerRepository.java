package com.ssafy.trudy.planner.repository;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.planner.model.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlannerRepository extends JpaRepository<Planner, Long> {

    Planner findPlannerById(Long id);

    List<Planner> findPlannersByMemberIdOrderBySequenceAsc(Member member);
}
