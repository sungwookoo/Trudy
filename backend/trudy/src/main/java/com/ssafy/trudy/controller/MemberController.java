package com.ssafy.trudy.controller;


import com.ssafy.trudy.model.member.Member;
import com.ssafy.trudy.model.member.MemberDto;
import com.ssafy.trudy.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    MemberService memberService;

    //일반 회원 가입
    @PostMapping
    public void memberAdd(){
    }

    //구글 연동 회원가입
    @PostMapping("/google")
    public void googleAdd(){

    }

    //일반 로그인
    @PostMapping("/login")
    public void loginDetail(){

    }

    //비밀번호 찾기
    @PutMapping("/lost")
    public void passwordModify(){

    }

    //회원 정보 수정
    @PutMapping("/{member_id}")
    public void memberModify(){

    }

    //팔로워 리스트 가져오기
    @GetMapping("/follower/{member_id}")
    public void followerList(){

    }

    //팔로우 리스트 가져오기
    @GetMapping("/following/{member_id}")
    public void followingList(){

    }

    //팔로잉 하기
    @PostMapping("/follow/{follow_from}/{follow_to}")
    public void followingAdd(){

    }

    //차단하기
    @PostMapping("/ban/{ban_from}/{ban_to}")
    public void banAdd(){

    }

    //자기 소개 정보 가져오기
    @GetMapping("/{member_id}")
    public void memberDetail(){

    }

    //회원 목록 가져오기
    @GetMapping("")
    public Result memberList(){
        List<Member> findMembers = memberService.findMemberList();
        List<MemberDto.MemberListDto> collect = findMembers.stream()
                .map(m -> new MemberDto.MemberListDto(m.getId(), m.getEmail(), m.getPassword(), m.getName(), m.getImage(), m.getGender(), m.getArea(), m.getBirth(), m.getIsLocal(), m.getIsPublic(), m.getLastAccess()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @GetMapping("/filter")
    @ResponseBody
    public Result memberListFiltered(@RequestBody MemberFilterDto memberFilterDto){
        byte userType = memberFilterDto.getUserType();
        String gender = memberFilterDto.getGender();
        List<Member> findMembers = memberService.findMemberListFiltered(userType, gender);
        List<MemberListDto> collect = findMembers.stream()
                .map(m -> new MemberListDto(m.getId(), m.getEmail(), m.getPassword(), m.getName(), m.getImage(), m.getGender(), m.getArea(), m.getBirth(), m.getIsLocal(), m.getIsPublic(), m.getLastAccess()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @Getter
    static class MemberFilterDto {
        private byte userType;
        private String gender;
    }


    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }


}
