package com.ssafy.trudy.planner;

import com.ssafy.trudy.planner.PlannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planner")
@Slf4j
@RequiredArgsConstructor
public class PlannerController {

    private final PlannerService plannerService;

    //플래너에 플랜 생성,수정
    @PostMapping
    public void plannerSave(){

    }

    //플래너 조회
    @GetMapping("/{member_id}/{planner_id}")
    public void plannerDetail(){

    }

    //플래너 삭제
    @DeleteMapping("/{member_id}")
    public void plannerRemove(){

    }
}
