package com.ssafy.trudy.planner.service;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.planner.model.*;
import com.ssafy.trudy.planner.repository.DayItemRepository;
import com.ssafy.trudy.planner.repository.DayRepository;
import com.ssafy.trudy.planner.repository.PlannerRepository;
import com.ssafy.trudy.post.model.Comment;
import com.ssafy.trudy.post.model.NestedComment;
import com.ssafy.trudy.post.model.PostDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlannerService {
    private final DayItemRepository dayItemRepository;
    @Autowired
    private final PlannerRepository plannerRepository;
    @Autowired
    private final DayRepository dayRepository;

    ModelMapper modelMapper = new ModelMapper();

    // [READ]해당 유저의 플래너 관련 정보 전부 가져오기
    public List<Map> getPlannersByMemberId(Member member) {
        // 반환값을 담을 변수
        List<Map> response = new ArrayList<>();

        // 1. planner list를 가져옴
        List<Planner> plannerEntityList = plannerRepository.findPlannersByMemberId(member);
        for(Planner plannerEntity : plannerEntityList) {
            // 2. plannerCombine에 1개의 플래너 상세정보(플래너, 멤버)를 채워넣음
            PlannerDto.PlannerCombine plannerCombine = new PlannerDto.PlannerCombine();

            PlannerDto.PlannerElement plannerElement = modelMapper.map(plannerEntity, PlannerDto.PlannerElement.class);
            PlannerDto.MemberElement memberElement = modelMapper.map(member, PlannerDto.MemberElement.class);

            plannerCombine = new PlannerDto.PlannerCombine(plannerElement, memberElement);
            /* plannerEntity로 days entity를 가져옴
                  -> day 정보를 모두 구하기, dayitems entity를 구하기
                      -> dayitems entity로 dayitem 정보를 구하기
            */
            // 3. plannerEntity를 이용해 day 정보를 채워넣기
            PlannerDto.DayCombine dayCombine = new PlannerDto.DayCombine();

            // day Entity List 가져오기
            List<Day> dayEntityList = dayRepository.findByPlannerId(plannerEntity);
            List<PlannerDto.DayElement> dayElementList = new ArrayList<>();
            // for(day entity 갯수)
            for (Day dayEntity : dayEntityList) {
                //1) Day DTO 생성
                PlannerDto.DayElement dayElement = new PlannerDto.DayElement();

                //2) Day DTO에 Day entity를 DTO로 변환후 저장
                dayElement = modelMapper.map(dayEntity, PlannerDto.DayElement.class);

                //3) dayItem List 채우기
                List<PlannerDto.DayItemElement> dayItemElementList = new ArrayList<>();
                List<DayItem> dayItemList = dayItemRepository.findByDayId(dayEntity);

                //4) dayItem List 채우기
                for (DayItem dayItemEntity : dayItemList) {
                    // 4-1) dayItem DTO 생성
                    PlannerDto.DayItemElement dayitemElement = new PlannerDto.DayItemElement();

                    // 4-2) dayItem DTO에 dayItem entity를 DTO로 변환(매핑) 후 저장
                    dayitemElement = modelMapper.map(dayItemEntity, PlannerDto.DayItemElement.class);

                    // dayItem Element List에 add
                    dayItemElementList.add(dayitemElement);
                }

                // Day Element의 요소인 dayItemList를 저장
                dayElement.setDayItemList(dayItemElementList);

                // dayElement List에 add
                dayElementList.add(dayElement);

                // dayCombine(자세한 구조는 PlannerDto.PlannerCombine 참고)에 dayElementList 저장
                dayCombine.setDayElementList(dayElementList);
            }
            Map<String, Object> responseElement = new HashMap<>();
            responseElement.put("plannerCombine", plannerCombine);
            responseElement.put("dayCombine", dayCombine);
            response.add(responseElement);
        }
        return response;
    }

    //*******************************[CREATE]****************************************//
    // 플래너 생성
    public Map addPlanner(Planner plannerInput, Member memberInput){
        // 1. 들어온 planner을 db에 저장
        plannerRepository.save(plannerInput);
        // 2. Dto 만들기
        PlannerDto.PlannerCombine plannerCombine = new PlannerDto.PlannerCombine();
        PlannerDto.PlannerElement plannerElement = modelMapper.map(plannerInput, PlannerDto.PlannerElement.class);
        PlannerDto.MemberElement memberElement = modelMapper.map(memberInput, PlannerDto.MemberElement.class);
        plannerCombine = new PlannerDto.PlannerCombine(plannerElement, memberElement);
        // 3. Map을 통해 반환
        Map<String, Object> response = new HashMap<>();
        response.put("plannerCombine", plannerCombine);
        return response;
    }

    // 데이 생성
    public Map addDay(Day dayInput){
        // 1. 들어온 day를 db에 저장
        dayRepository.save(dayInput);
        // 2. Dto 만들기
        DayDto dayDto = modelMapper.map(dayInput, DayDto.class);
        // 3. Map을 통해 반환
        Map<String, Object> response = new HashMap<>();
        response.put("dayInfo", dayDto);
        return response;
    }

    // 데이 아이템 생성
    public Map addDayItem(DayItem dayItemInput){
        // 1. 들어온 dayItem을 db에 저장
        dayItemRepository.save(dayItemInput);
        // 2. Dto 만들기
        DayItemDto dayItemDto = modelMapper.map(dayItemInput, DayItemDto.class);
        // 3. Map을 통해 반환
        Map<String, Object> response = new HashMap<>();
        response.put("dayItemInfo", dayItemDto);
        return response;
    }

    // 플래너 제목 수정
//    public PlannerDto editPlannerTitle(Planner planner, String newTitle){
//        planner.setTitle(newTitle);
//        PlannerDto plannerDto = new PlannerDto();
//        plannerDto.
//        plannerDto.setMemeberId(planner.getMemberId());
//        plannerDto.setTitle(planner.getTitle());
//        plannerDto.setSequence(planner.getSequence());
//
//        return plannerDto;
//    }

    // 플래너 순서 수정
//    public PlannerDto editPlannerSequence(Planner planner, String newSequence){
//        planner.setTitle(newSequence);
//        PlannerDto plannerDto = new PlannerDto();
//        plannerDto.setId(planner.getId());
//        plannerDto.setMemeberId(planner.getMemberId());
//        plannerDto.setTitle(planner.getTitle());
//        plannerDto.setSequence(planner.getSequence());
//
//        return plannerDto;
//    }

    // id값으로 day 받기
    public Day getDayById(Long dayId){
        return dayRepository.findDayById(dayId);
    }

    //플래너 삭제
    public void removePlanner(){

    }

    // id로 day 조회
    public Day findDayById(Long dayId) {
        return dayRepository.findDayById(dayId);
    }

    // id로 planner 조회
    public Planner findPlannerById(Long plannerId) {
        return plannerRepository.findPlannerById(plannerId);
    }


    // 생성된 DayItem의 이미지 URL 갱신
    public DayItem saveDayItemImage(String uploadImageUrl, String fileName,  Long dayItemId) {
        DayItem dayItem = dayItemRepository.findById(dayItemId).orElseThrow(() -> new RuntimeException("존재하지 않는 DayItem"));
        dayItem.setCustomImage(uploadImageUrl);
        dayItem.setCustomImageFileName(fileName);
        return dayItemRepository.save(dayItem);
    }

    public DayItem getDayItemById(Long dayItemId) {
        return dayItemRepository.findById(dayItemId).orElseThrow(() -> new RuntimeException("존재하지 않는 DayItem"));
    }
}
