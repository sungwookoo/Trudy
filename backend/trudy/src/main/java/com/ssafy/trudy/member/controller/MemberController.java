package com.ssafy.trudy.member.controller;


import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.service.MemberAppService;
import com.ssafy.trudy.member.model.dto.MemberIntroRequest;
import com.ssafy.trudy.member.model.dto.MemberIntroResponse;
import com.ssafy.trudy.member.model.dto.MemberModifyRequest;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ResponseHeader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    private final MemberAppService memberAppService;


    @ApiOperation(value = "회원 리스트",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @GetMapping
    public Page<MemberResponse> getByPageable(@RequestParam(required = false) String name,
                                              @RequestParam(required = false) String gender,
                                              @RequestParam(required = false) String areaCode,
                                              @RequestParam(required = false) String sigunguCode,
                                              @RequestParam(required = false) String isLocal,
                                              @PageableDefault(size = 9, sort = "id") Pageable pageable) {
        return memberAppService.getByPageable(name, gender, areaCode, sigunguCode, isLocal, pageable);
    }


    @ApiOperation(value = "내 프로필",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @GetMapping("/me")
    public MemberResponse me(@AuthenticationPrincipal PrincipalDetails principal) {
        return memberAppService.me(principal);
    }

    @ApiOperation(value = "다른사람 프로필",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @GetMapping("/{id}")
    public MemberResponse memberDetail(@PathVariable("id") Long id) {
        return memberAppService.memberDetail(id);
    }

    @ApiOperation(value = "개인정보 수정",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @PutMapping("/info")
    public MemberResponse modifyMember(@AuthenticationPrincipal PrincipalDetails principal, @RequestBody MemberModifyRequest memberModifyRequest) {
        return memberAppService.modifyMember(principal, memberModifyRequest);

    }

    @ApiOperation(value = "자기소개 수정",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @PutMapping("/intro")
    public MemberIntroResponse modifyMemberIntro(@AuthenticationPrincipal PrincipalDetails principal, @RequestBody MemberIntroRequest modifyIntroRequest) {
        return memberAppService.modifyMemberIntro(principal, modifyIntroRequest);
    }

    @ApiOperation(value = "정보공개 여부 토글",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @PutMapping("/public")
    public MemberResponse changePublicState(@AuthenticationPrincipal PrincipalDetails principal) {
        return memberAppService.changePublicState(principal);
    }


    @ApiOperation(value = "팔로워 리스트 가져오기",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @GetMapping("/follower/{id}")
    public Page<MemberResponse> followerList(@PathVariable Long id, @PageableDefault(size = 10, sort = "id") Pageable pageable, @AuthenticationPrincipal PrincipalDetails principal) {
        return memberAppService.getByFollowerPageable(id ,pageable, principal);
    }

    @ApiOperation(value = "팔로잉 리스트 가져오기",
            produces = MediaType.APPLICATION_JSON_VALUE,
            responseHeaders = {
                    @ResponseHeader(name = HttpHeaders.CONTENT_TYPE, description = MediaType.APPLICATION_JSON_VALUE),
                    @ResponseHeader(name = HttpHeaders.AUTHORIZATION, description = "bearer token")
            })
    @GetMapping("/following/{id}")
    public Page<MemberResponse> followingList(@PathVariable Long id, @PageableDefault(size = 10, sort = "id") Pageable pageable, @AuthenticationPrincipal PrincipalDetails principal) {
        return memberAppService.getByFollowingPageable(id ,pageable, principal);
    }

    //팔로잉 하기
    @PostMapping("/follow/{follow_from}/{follow_to}")
    public void followingAdd() {

    }

    //차단하기
    @PostMapping("/ban/{ban_from}/{ban_to}")
    public void banAdd() {

    }


    // 회원 삭제
//    @DeleteMapping("/{id}")
//    public ResponseEntity<MemberResponse> deleteMember(@PathVariable("id") Long id) {
//        try {
//            memberService.deleteMember(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }


    //구글 연동 회원가입
    @PostMapping("/google")
    public void googleAdd() {

    }

    //비밀번호 찾기
    @PutMapping("/lost")
    public void passwordModify() {

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
