package com.ssafy.trudy.planner.controller;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.place.model.Place;
import com.ssafy.trudy.place.service.PlaceService;
import com.ssafy.trudy.planner.model.*;
import com.ssafy.trudy.planner.repository.DayItemRepository;
import com.ssafy.trudy.planner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    private final PlaceService placeService;

    //**************************************[READ]***************************************//
    // 해당 유저 플래너 정보 전체보기
    @GetMapping
    public ResponseEntity<?> plannerInfoByMember(@AuthenticationPrincipal PrincipalDetails principal) {
            Member member = principal.getMember();
            List<Map<String, Object>> response = plannerService.getPlannersByMemberId(member);

            if(response != null && !response.isEmpty()){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }

    }

    //**************************************[CREATE]***************************************//
    // 플래너 생성
    @PostMapping("/post")
    public ResponseEntity<?> plannerAdd(@AuthenticationPrincipal PrincipalDetails principal,
                                 @RequestParam(defaultValue = "new planner") String title,
                                 @RequestParam String sequence){
            Member member = principal.getMember();
            Planner planner = new Planner(member, title, sequence);
            Map<String, Object> response = plannerService.addPlanner(planner, member);

            if(response != null && !response.isEmpty()){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
    }

    // 데이 생성
    @PostMapping("/day/post")
    public ResponseEntity<?> dayAdd(@RequestParam Long plannerId,
                                    @RequestParam String day,
                                    @RequestParam String memo,
                                    @RequestParam String sequence){
        try {
            Planner planner = plannerService.findPlannerById(plannerId);
            Day newDay = new Day(planner, day, memo, sequence);
            Map<String, Object> response = plannerService.addDay(newDay, planner);

            if(response != null && !response.isEmpty()){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // 데이 아이템 생성
    @PostMapping("/dayitem/post")
    public ResponseEntity<?> dayItemAdd(@RequestParam(defaultValue = "") String placeId,
                                        @RequestParam Long dayId,
                                        @RequestParam(defaultValue = "") String memo,
                                        @RequestParam String sequence,
                                        @RequestParam(defaultValue = "") String customTitle
                                        ){
        try {
            // response 변수 선언
            Map response;
            // Place 정보가 있다면 -> place dayItem 만들기
            if(!placeId.equals("")){
                Long placeIdL = Long.parseLong(placeId);
                Place placeInput = placeService.findPlaceById(placeIdL);
                Day dayInput = plannerService.findDayById(dayId);
                // place 정보가 있기 때문에, 타이틀과 이미지는 place 객체에서 받아온다.
                DayItem placeDayItem = new DayItem(placeInput, dayInput, memo, sequence, placeInput.getTitle(), placeInput.getFirstimage());
                response = plannerService.addDayItem(placeDayItem);
            // Place 정보가 없다면 -> custom place dayItem 만들기
            } else {
                Day dayInput = plannerService.findDayById(dayId);
                DayItem customPlaceDayItem = new DayItem(dayInput, memo, sequence, customTitle);
                response = plannerService.addDayItem(customPlaceDayItem);
            }

            if(!response.isEmpty()){
                return ResponseEntity.ok().body(response);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            e.getStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    //**************************************[UPDATE]********************************************//
    // dayItem 수정(메모, 제목, 이미지)
    @PutMapping("/dayitem/update/string")
    public DayItemPutDto dayItemStringUpdate(@RequestParam Long dayItemId,
                                             @RequestParam String updatedMemo,
                                             @RequestParam String updatedCustomTitle,
                                             @RequestParam String updatedCustomImage){
        return plannerService.updateDayItemString(dayItemId, updatedMemo, updatedCustomTitle, updatedCustomImage);
    }

    // day 수정(메모)
    @PutMapping("/day/update/string")
    public DayPutDto dayStringUpdate(@RequestParam Long dayId,
                                     @RequestParam String updatedMemo){
        return plannerService.updateDayString(dayId, updatedMemo);
    }

    // planner 수정(제목)
    @PutMapping("/planner/update/string")
    public PlannerPutDto plannerStringUpdate(@RequestParam Long plannerId,
                                          @RequestParam String title){
        return plannerService.updatePlannerString(plannerId, title);
    }

    @PutMapping("/planner")
    public String plannerSequenceUpdate(@RequestParam Long plannerId,
                                        @RequestParam String sequence) {
        return plannerService.plannerSequenceUpdate(plannerId, sequence);
    }

    @PutMapping("/day")
    public String daySequenceUpdate(@RequestParam Long dayId,
                                    @RequestParam String sequence) {
        return plannerService.daySequenceUpdate(dayId, sequence);
    }

    @PutMapping("/dayitem")
    public String dayItemSequenceUpdate(@RequestParam Long dayItemId,
                                    @RequestParam String sequence) {
        return plannerService.dayItemSequenceUpdate(dayItemId, sequence);
    }


    /*
    순서를 받는 방법은 아래와 같다.
     */
    // dayItem 수정(순서)
//    @PutMapping("/planner/update/order")
//    public void dayItemOrderUpdate(@Request List)

    // day 수정(순서)

    // planner 수정(메모)

    //*********************************[delete]*************************************//
    // dayItem 삭제
    @DeleteMapping("/dayitem/delete")
    public void dayItemRemove(@RequestParam Long dayItemId){
        plannerService.removeDayItem(dayItemId);
    }

    // day 삭제
    @DeleteMapping("/day/delete")
    public void dayRemove(@RequestParam Long dayId){
        plannerService.removeDay(dayId);
    }

    // planner 삭제
    @DeleteMapping("/planner/delete")
    public void plannerRemove(@RequestParam Long plannerId){
        plannerService.removePlanner(plannerId);
    }
}
