package com.ssafy.trudy.member;


import com.ssafy.trudy.config.JwtConfig;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.MemberDto;
import com.ssafy.trudy.member.model.MemberRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {


    private final MemberService memberService;
    private final JwtConfig jwtConfig;

    //일반 회원 가입
    @PostMapping("/signup")
    public MemberDto createMember(MemberRequest memberRequest) {
        return memberService.createMember(memberRequest);
    }

    //구글 연동 회원가입
    @PostMapping("/google")
    public void googleAdd(){

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

    // 내 프로필
    @GetMapping("/mypage")
    public MemberDto findMember(Authentication authentication){
        if(authentication == null) {
            throw new BadCredentialsException("회원 정보를 찾을 수 없습니다.");
        }
        return memberService.findMember(authentication.getName());
    }

    // 다른 사람 프로필
    @GetMapping("/profile")
    public MemberDto memberDetail(@RequestParam String email){
        return memberService.findMember(email);
    }

    //회원 목록 가져오기
    @GetMapping("")
    public List<MemberDto> findAllMember() {
        return memberService.findAll();
    }

    // 로그인
    @PostMapping("/login")
    public String login(MemberRequest memberRequest) {
        MemberDto member = memberService.findByEmailAndPassword(memberRequest.getEmail(), memberRequest.getPassword());
        return jwtConfig.createToken(member.getEmail(), Arrays.asList(member.getRole().getValue()));
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
