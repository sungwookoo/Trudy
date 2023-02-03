package com.ssafy.trudy.member.controller;


import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.service.MemberAppService;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {


    private final MemberAppService memberAppService;

    // 회원 목록 조회
    @GetMapping
    public Page<MemberResponse> getByPageable(@AuthenticationPrincipal PrincipalDetails principal,
                                            @RequestParam(required = false) String name,
                                            @RequestParam(required = false) String email,
                                            @PageableDefault(size=3, sort="id") Pageable pageable) {
        return memberAppService.getByPageable(principal, name, email, pageable);
    }

    @GetMapping("/me")
    public MemberResponse me(@AuthenticationPrincipal PrincipalDetails principal) {
        return memberAppService.me(principal);
    }

    // 회원 정보 수정
//    @PutMapping("/{id}")
//    public ResponseEntity<MemberResponse> modifyMember(@PathVariable("id") Long id, @RequestBody MemberRequest memberRequest){
//        return memberService.modifyMember(id, memberRequest);
//    }

    // 회원 삭제
    @DeleteMapping("/{id}")
//    public ResponseEntity<MemberResponse> deleteMember(@PathVariable("id") Long id) {
//        try {
//            memberService.deleteMember(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    // 다른 사람 프로필
//    @GetMapping("/{id}")
//    public MemberProfileResponse memberDetail(@PathVariable("id") Long id){
//        String email = memberService.findEmailById(id);
//        return memberService.findMember(email);
//    }

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
