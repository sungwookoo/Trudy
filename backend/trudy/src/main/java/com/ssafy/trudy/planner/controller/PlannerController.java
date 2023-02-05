package com.ssafy.trudy.planner.controller;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.service.PlaceService;
import com.ssafy.trudy.planner.model.*;
import com.ssafy.trudy.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planner")
@Slf4j
@RequiredArgsConstructor
public class PlannerController {
    // DayItem Post생성
    // DayItem은 커스텀도 있고, 기존 정보로 찾아오는 것도 있다.
    // customImage는 커스텀일 때만 들어오면 된다.
//    @PostMapping("/dayitem/post")
//    private DayItemDto dayItemSave(@RequestParam(required = false) String contentId,
//                                   @RequestParam Long dayId,
//                                   @RequestParam(required = false) String memo,
//                                   @RequestParam(required = false) String customTitle,
//                                   @RequestParam(required = false) String customImage) {
//        Place place = placeService.getByContentId(contentId);
//        Day day = plannerService.getDayById(dayId);
//
//          }
    @Autowired
    private final PlannerService plannerService;
    @Autowired
    private final MemberService memberService;
    @Autowired
    private final PlaceService placeService;

    //플래너에 플랜 생성
    @PostMapping("/post")
    public PlannerDto plannerAdd(@RequestParam Long memberId,
                                 @RequestParam String title,
                                 @RequestParam String sequence){
        Member member = memberService.getById(memberId);

        Planner planner = new Planner(member, title, sequence);
        return plannerService.addPlanner(planner);
    }

    // 플래너 수정(제목)
    @PutMapping("/updata/title")
    public PlannerDto plannerUpdateTitle(@RequestParam Long plannerId,
                                    @RequestParam String newTitle){
        Planner planner = plannerService.getPlannerById(plannerId);
        return plannerService.editPlannerTitle(planner, newTitle);
    }

    // 플래너 수정(순서)
    @PutMapping("/updata/sequence")
    public PlannerDto plannerUpdateSequence(@RequestParam Long plannerId,
                                         @RequestParam String newSequence){
        Planner planner = plannerService.getPlannerById(plannerId);
        return plannerService.editPlannerSequence(planner, newSequence);
    }

    //플래너 조회
    @GetMapping("/{member_id}/{planner_id}")
    public void plannerDetail(@RequestParam Long member_id,
                              @RequestParam Long planner_id){
        // 해당 멤거

    }

    //플래너 삭제 - dayItem 삭재 -> day 삭제 -> planner 삭제
    @DeleteMapping("/{member_id}")
    public void plannerRemove(){

    }
}
