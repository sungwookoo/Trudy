package com.ssafy.trudy.planner.controller;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.service.PlaceService;
import com.ssafy.trudy.planner.model.*;
import com.ssafy.trudy.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner")
@Slf4j
@RequiredArgsConstructor
public class PlannerController {
    @Autowired
    private final PlannerService plannerService;
    @Autowired
    private final MemberService memberService;
    @Autowired
    private final PlaceService placeService;

    ModelMapper modelMapper = new ModelMapper();

    // 해당 유저의 플래너 전체 정보 보내기
    @GetMapping()
    public List<PlannerDto> plannerAllByMember(@RequestParam Long memberId) throws Exception{
        Member member = memberService.getById(memberId);
        return plannerService.getPlannersByMemberId(member);
    }

    //플래너에 플랜 생성
//    @PostMapping("/post")
//    public PlannerDto plannerAdd(@RequestParam Long memberId,
//                                 @RequestParam String title,
//                                 @RequestParam String sequence){
//        Member member = memberService.getById(memberId);
//
//        Planner planner = new Planner(member, title, sequence);
//        return plannerService.addPlanner(planner);
//    }

    // 플래너 수정(제목)
//    @PutMapping("/updata/title")
//    public PlannerDto plannerUpdateTitle(@RequestParam Long plannerId,
//                                    @RequestParam String newTitle){
//        Planner planner = plannerService.getPlannerById(plannerId);
//        return plannerService.editPlannerTitle(planner, newTitle);
//    }

    // 플래너 수정(순서)
//    @PutMapping("/updata/sequence")
//    public PlannerDto plannerUpdateSequence(@RequestParam Long plannerId,
//                                         @RequestParam String newSequence){
//        Planner planner = plannerService.getPlannerById(plannerId);
//        return plannerService.editPlannerSequence(planner, newSequence);
//    }

    //플래너 삭제 - dayItem 삭재 -> day 삭제 -> planner 삭제
    @DeleteMapping("/{member_id}")
    public void plannerRemove(){

    }
}
