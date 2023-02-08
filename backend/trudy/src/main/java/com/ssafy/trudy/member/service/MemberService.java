package com.ssafy.trudy.member.service;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.Follow;
import com.ssafy.trudy.member.model.Introduce;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.RefreshToken;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.member.repository.FollowRepository;
import com.ssafy.trudy.member.repository.IntroduceRepository;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final IntroduceRepository introduceRepository;

    @Autowired
    private final FollowRepository followRepository;

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
        member.setLastAccess(LocalDateTime.now());
        memberRepository.save(member);

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
        member.setIntroduceId(introduceRepository.save(new Introduce()));
        return memberRepository.save(member);
    }

    public void deleteByMemberId(Long memberId) {
        Member member = this.getById(memberId);

        List<RefreshToken> refreshTokens = member.getRefreshTokens();

        member.setRefreshTokens(new ArrayList<>());

        this.save(member);
        refreshTokenRepository.deleteAll(refreshTokens);
    }

    /*
        @RequestParam(required = false) String name,
                                              @RequestParam(required = false) String email,
                                              @RequestParam(required = false) String gender,
                                              @RequestParam(required = false) Long areaCode,
                                              @RequestParam(required = false) Long sigunguCode,
                                              @RequestParam(required = false) String isLocal,
     */


    public Page<Member> getSearchByPageable(String name, String gender, String areaCode, String sigunguCode, String isLocal, Pageable pageable) {
        return memberRepository.findAll(MemberSpecification.getSearchByPageable(name, gender, areaCode, sigunguCode, isLocal), pageable);
    }

    public Introduce getByIntroduceId(Long introduceId) {
        return introduceRepository.findById(introduceId).orElse(null);
    }



    //구글 연동 회원가입
    public void addGoogle() {

    }

    //비밀번호 찾기
    public void modifyPassword() {

    }

    //팔로잉 하기
    public void addFollowing() {

    }

    //차단하기
    public void addBan() {

    }

    //자기 소개 정보 가져오기
    public void findMemberDetail() {

    }

    public Introduce saveIntroduce(Introduce introduce) {
        return introduceRepository.save(introduce);
    }

    public Member changePublicState(Member member) {
        if (member.getIsPublic().equals("1")) {
            member.setIsPublic("0");
        } else member.setIsPublic("1");
        return memberRepository.save(member);
    }


    // 중복 이메일 검사 중복:1
    public boolean emailCheck(String email) {
        return memberRepository.existsByEmail(email);

    }

    // 중복 닉네임 검사 중복:1
    public boolean nameCheck(String name) {
        return memberRepository.existsByName(name);
    }

    // 현재 프로필 회원을 팔로우하는 회원 목록
    public Page<Follow> getFollowerByPageable(Long id, Pageable pageable) {
        Member member = memberRepository.findById(id).orElseThrow(() ->new ApiException(ServiceErrorType.NOT_FOUND));
        return followRepository.findAllByFollowTo(member, pageable);
    }

    // 나 -> targetId 회원 팔로우 여부 : 했으면 true(팔로잉불가상태), 안했으면 false(팔로잉가능상태)
    public boolean isFollow(PrincipalDetails principal, Member targetMember) {
        return followRepository.existsByFollowFromAndFollowTo(principal.getMember(), targetMember);
    }
}
