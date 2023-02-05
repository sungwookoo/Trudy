package com.ssafy.trudy.planner.service;

import com.ssafy.trudy.planner.model.Day;
import com.ssafy.trudy.planner.model.Planner;
import com.ssafy.trudy.planner.model.PlannerDto;
import com.ssafy.trudy.planner.repository.DayRepository;
import com.ssafy.trudy.planner.repository.PlannerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlannerService {

    @Autowired
    private final PlannerRepository plannerRepository;
    @Autowired
    private final DayRepository dayRepository;

    // 플래너에 플랜 생성
    public PlannerDto addPlanner(Planner planner){
        Planner newPlanner = plannerRepository.save(planner);
        PlannerDto plannerDto = new PlannerDto();
        plannerDto.setId(newPlanner.getId());
        plannerDto.setMemeberId(newPlanner.getMemberId());
        plannerDto.setTitle(newPlanner.getTitle());
        plannerDto.setSequence(newPlanner.getSequence());

        return plannerDto;
    }

    // 아이디로 플래너 조회
    public Planner getPlannerById(Long id){
        return plannerRepository.getPlannerById(id);
    }

    // 플래너 제목 수정
    public PlannerDto editPlannerTitle(Planner planner, String newTitle){
        planner.setTitle(newTitle);
        PlannerDto plannerDto = new PlannerDto();
        plannerDto.setId(planner.getId());
        plannerDto.setMemeberId(planner.getMemberId());
        plannerDto.setTitle(planner.getTitle());
        plannerDto.setSequence(planner.getSequence());

        return plannerDto;
    }

    // 플래너 순서 수정
    public PlannerDto editPlannerSequence(Planner planner, String newSequence){
        planner.setTitle(newSequence);
        PlannerDto plannerDto = new PlannerDto();
        plannerDto.setId(planner.getId());
        plannerDto.setMemeberId(planner.getMemberId());
        plannerDto.setTitle(planner.getTitle());
        plannerDto.setSequence(planner.getSequence());

        return plannerDto;
    }

    // id값으로 day 받기
    public Day getDayById(Long dayId){
        return dayRepository.getDayById(dayId);
    }

    //플래너 조회
    public void findPlanner(){

    }

    //플래너 삭제
    public void removePlanner(){

    }

}
