package com.ssafy.trudy.member.controller;


import com.ssafy.trudy.config.JwtConfig;
import com.ssafy.trudy.member.model.MemberDto;
import com.ssafy.trudy.member.model.MemberInfoDto;
import com.ssafy.trudy.member.model.MemberLoginDto;
import com.ssafy.trudy.member.model.MemberRequest;
import com.ssafy.trudy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {


    private final MemberService memberService;
    private final JwtConfig jwtConfig;

    // 회원 가입
    @PostMapping("/signup")
    public MemberDto createMember(MemberRequest memberRequest) {
        return memberService.createMember(memberRequest);
    }


    // 회원 목록 조회
    @GetMapping("/")
    public List<MemberDto> findAllMember() {
        return memberService.findAll();
    }


    // 회원 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<MemberDto> modifyMember(@PathVariable("id") Long id, @RequestBody MemberRequest memberRequest){
        return memberService.modifyMember(id, memberRequest);
    }

    // 회원 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<MemberDto> deleteMember(@PathVariable("id") Long id) {
        try {
            memberService.deleteMember(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 내 프로필
    @GetMapping("/mypage")
    public MemberInfoDto findMember(Authentication authentication){
        if(authentication == null) {
            throw new BadCredentialsException("회원 정보를 찾을 수 없습니다.");
        }
        return memberService.findMember(authentication.getName());
    }

    // 다른 사람 프로필
    @GetMapping("/{id}")
    public MemberInfoDto memberDetail(@PathVariable("id") Long id){
        String email = memberService.findEmailById(id);
        return memberService.findMember(email);
    }

    // 로그인
    @PostMapping("/login")
    public String login(MemberRequest memberRequest) {
        MemberLoginDto member = memberService.findByEmailAndPassword(memberRequest.getEmail(), memberRequest.getPassword());
        return jwtConfig.createToken(member.getEmail(), Arrays.asList(member.getRole().getValue()));
    }


    //구글 연동 회원가입
    @PostMapping("/google")
    public void googleAdd(){

    }

    //비밀번호 찾기
    @PutMapping("/lost")
    public void passwordModify(){

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



//    @GetMapping("")
//    public Result memberList(){
//        List<Member> findMembers = memberService.findMemberList();
//        List<MemberDto.MemberListDto> collect = findMembers.stream()
//                .map(m -> new MemberDto.MemberListDto(m.getId(), m.getEmail(), m.getPassword(), m.getName(), m.getImage(), m.getGender(), m.getArea(), m.getBirth(), m.getIsLocal(), m.getIsPublic(), m.getLastAccess()))
//                .collect(Collectors.toList());
//
//        return new Result(collect);
//    }
//    @GetMapping("/filter")
//    @ResponseBody
//    public Result memberListFiltered(@RequestBody MemberFilterDto memberFilterDto){
//        byte userType = memberFilterDto.getUserType();
//        String gender = memberFilterDto.getGender();
//        List<Member> findMembers = memberService.findMemberListFiltered(userType, gender);
//        List<MemberDto.MemberListDto> collect = findMembers.stream()
//                .map(m -> new MemberDto.MemberListDto(m.getId(), m.getEmail(), m.getPassword(), m.getName(), m.getImage(), m.getGender(), m.getArea(), m.getBirth(), m.getIsLocal(), m.getIsPublic(), m.getLastAccess()))
//                .collect(Collectors.toList());
//
//        return new Result(collect);
//    }
//
//    @Getter
//    static class MemberFilterDto {
//        private byte userType;
//        private String gender;
//    }
//
//
//    @Data
//    @AllArgsConstructor
//    static class Result<T> {
//        private T data;
//    }


}
