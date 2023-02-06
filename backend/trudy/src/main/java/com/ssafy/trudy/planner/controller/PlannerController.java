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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    //**************************************[READ]***************************************//
    // 해당 유저 플래너 정보 전체보기
    @GetMapping
    public ResponseEntity<?> plannerInfoByMember(@RequestParam Long memberId) throws Exception{
        try {
            Member member = memberService.getById(memberId);
            List<Map> response = plannerService.getPlannersByMemberId(member);

            if(!response.isEmpty() && response != null){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //**************************************[CREATE]***************************************//
    // 플래너 생성
    @PostMapping("/post")
    public ResponseEntity<?> plannerAdd(@RequestParam Long memberId,
                                 @RequestParam(defaultValue = "new planner") String title,
                                 @RequestParam String sequence){
        try {
            Member member = memberService.getById(memberId);
            Planner planner = new Planner(member, title, sequence);
            Map response = plannerService.addPlanner(planner, member);

            if(!response.isEmpty() && response != null){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 데이 생성
    @PostMapping("/day/post")
    public ResponseEntity<?> dayAdd(@RequestParam Long plannerId,
                                    @RequestParam String day,
                                    @RequestParam String memo){
        try {
            Planner planner = plannerService.findPlannerById(plannerId);
            Day newDay = new Day(planner, day, memo);
            Map response = plannerService.addDay(newDay);

            if(!response.isEmpty() && response != null){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 데이 아이템 생성*******
    @PostMapping("/dayitem/post")
    public ResponseEntity<?> dayItemAdd(@RequestParam(defaultValue = "") String placeId,
                                        @RequestParam Long dayId,
                                        @RequestParam(defaultValue = "") String memo,
                                        @RequestParam String sequence,
                                        @RequestParam(defaultValue = "") String customTitle,
                                        @RequestParam String customImage){
        try {
            // response 변수 선언
            Map response;
            // Place 정보가 있다면 -> place dayItem 만들기
            if(!placeId.equals("")) {
                Long placeIdL = Long.parseLong(placeId);
                Place placeInput = placeService.findPlaceById(placeIdL);
                Day dayInput = plannerService.findDayById(dayId);
                // place 정보가 있기 때문에, 타이틀과 이미지는 place 객체에서 받아온다.
                DayItem placeDayItem = new DayItem(placeInput, dayInput, memo, sequence, placeInput.getTitle(), placeInput.getFirstimage());
                response = plannerService.addDayItem(placeDayItem);
            // Place 정보가 없다면 -> custom place dayItem 만들기
            } else {
                Day dayInput = plannerService.findDayById(dayId);
                DayItem customPlaceDayItem = new DayItem(dayInput, memo, sequence, customTitle, customImage);
                response = plannerService.addDayItem(customPlaceDayItem);
            }

            if(!response.isEmpty() && response != null){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

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
