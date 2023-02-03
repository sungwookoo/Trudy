package com.ssafy.trudy.member.service;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.*;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.member.model.dto.MemberProfileResponse;
import com.ssafy.trudy.auth.dto.request.LoginRequest;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private final MemberRepository memberRepository;

    public Member getByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(ServiceErrorType.NOT_FOUND));
    }

    public Member getById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new ApiException(ServiceErrorType.NOT_FOUND));
    }

    public void createRefreshToken(Authentication authentication, String token) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Member member = this.getById(((PrincipalDetails) userDetails).getMember().getId());

        RefreshToken refreshToken = RefreshToken.builder()
                .member(member)
                .token(token)
                .build();

        refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken getByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new ApiException(ServiceErrorType.WAS_LOGOUT_USER));
    }


    public void deleteByRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteByToken(refreshToken);
    }

    public Member save(Member member) {
        return memberRepository.save(member);
    }

    public void deleteByMemberId(Long memberId) {
        Member member = this.getById(memberId);

        List<RefreshToken> refreshTokens = member.getRefreshTokens();

        member.setRefreshTokens(new ArrayList<>());

        this.save(member);
        refreshTokenRepository.deleteAll(refreshTokens);
    }

    public Page<Member> getSearchByPageable(String name, String email, Pageable pageable) {
        Page<Member> member;

        if (Objects.nonNull(name) && Objects.nonNull(email)) {
            member = memberRepository.findByNameContainingOrEmailContaining(name, email, pageable);
        } else if (Objects.nonNull(email)) {
            member = memberRepository.findByEmailContaining(email, pageable);
        } else if (Objects.nonNull(name)) {
            member = memberRepository.findByNameContaining(name, pageable);
        } else {
            member = memberRepository.findAll(pageable);
        }

        return member;
    }

    //구글 연동 회원가입
    public void addGoogle(){

    }

    //비밀번호 찾기
    public void modifyPassword(){

    }

    //팔로워 리스트 가져오기
    public void findFollowerList(){

    }

    //팔로우 리스트 가져오기
    public void findFollowingList(){

    }

    //팔로잉 하기
    public void addFollowing(){

    }

    //차단하기
    public void addBan(){

    }

    //자기 소개 정보 가져오기
    public void findMemberDetail(){

    }


    //회원 목록 가져오기 - 조회시 최근 접속일자를 내림차순
//    public List<Member> findMemberList(){
//        return memberRepository.findMemberList();
//    }
//
//    // 필터된 회원 목록 가져오기
//    public List<Member> findMemberListFiltered(byte userType, String gender) { return memberRepository.findMemberListFiltered(userType, gender); }
}
