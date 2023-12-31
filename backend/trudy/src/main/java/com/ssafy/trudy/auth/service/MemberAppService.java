package com.ssafy.trudy.auth.service;

import com.ssafy.trudy.auth.dto.request.LoginRequest;
import com.ssafy.trudy.auth.dto.request.SignupRequest;
import com.ssafy.trudy.auth.dto.request.TokenRequest;
import com.ssafy.trudy.auth.dto.response.TokenResponse;
import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.security.provider.TokenProvider;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.Introduce;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.RefreshToken;
import com.ssafy.trudy.member.model.dto.*;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberAppService {
    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired
    private MemberService memberService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private PostService postService;

    @Transactional
    public TokenResponse login(LoginRequest loginRequest) {
        // 1. ID/PW 로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        // 2. 사용자 검증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3.JWT 토큰 생성
        TokenResponse customToken = tokenProvider.generateToken(authentication);

        // 4. RefreshToken 저장
        memberService.createRefreshToken(authentication, customToken.getRefreshToken());


        // 5. 토큰 발급
        return customToken;
    }

    @Transactional
    public TokenResponse reissuance(TokenRequest tokenRequest) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequest.getRefreshToken())) {
            // 1-1 토큰 삭제
            memberService.deleteByRefreshToken(tokenRequest.getRefreshToken());

            throw new ApiException(ServiceErrorType.INVALID_USER_REFRESH_TOKEN);
        }

        // 2. Access Token 에서 인증 정보
        Authentication authentication = tokenProvider.getAuthentication(tokenRequest.getAccessToken());

        // 3. Refresh Token 정보
        RefreshToken refreshToken = memberService.getByRefreshToken(tokenRequest.getRefreshToken());

        // 5. 새로운 토큰 생성
        TokenResponse customToken = tokenProvider.generateAccessToken(authentication);

        customToken.setRefreshToken(refreshToken.getToken());

        // 토큰 발급
        return customToken;
    }

    public MemberIntroResponse modifyMemberIntro(PrincipalDetails principal, MemberIntroRequest modifyIntroRequest) {
        Member member = memberService.getById(principal.getMember().getId());
        Introduce introduce = member.getIntroduceId();
        introduce.setTitle(modifyIntroRequest.getTitle());
        introduce.setPlan(modifyIntroRequest.getPlan());
        introduce.setSelf(modifyIntroRequest.getSelf());
        introduce.setLanguage(modifyIntroRequest.getLanguage());

        Introduce modifiedIntroduce = memberService.saveIntroduce(introduce);

        return MemberIntroResponse.builder()
                .title(modifiedIntroduce.getTitle())
                .plan(modifyIntroRequest.getPlan())
                .self(modifyIntroRequest.getSelf())
                .language(modifyIntroRequest.getLanguage())
                .build();
    }

    public MemberResponse modifyMember(PrincipalDetails principal, MemberModifyRequest modifyRequest) {
        modifyRequest.validation();

        Member member = memberService.getById(principal.getMember().getId());

        member.setName(modifyRequest.getName());
        member.setPassword(passwordEncoder.encode(modifyRequest.getPassword()));
        member.setGender(modifyRequest.getGender());
        member.setBirth(modifyRequest.getBirth());
        member.setIsLocal(modifyRequest.getIsLocal());
        member.setAreaCode(modifyRequest.getAreaCode());
        member.setSigunguCode(modifyRequest.getSigunguCode());

        Member modifiedMember = memberService.save(member);

        return MemberResponse.builder()
                .id(modifiedMember.getId())
                .email(modifiedMember.getEmail())
                .name(modifiedMember.getName())
                .gender(modifiedMember.getGender())
                .birth(modifiedMember.getBirth())
                .isLocal(modifiedMember.getIsLocal())
                .areaCode(modifiedMember.getAreaCode())
                .sigunguCode(modifiedMember.getSigunguCode())
                .lastAccess(modifiedMember.getLastAccess())
                .build();

    }

    @Transactional
    public MemberResponse signup(SignupRequest signupRequest) {
        signupRequest.validation();

        Member member = Member.signupBuilder()
                .email(signupRequest.getEmail())
                .name(signupRequest.getName())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .gender(signupRequest.getGender())
                .birth(signupRequest.getBirth())
                .isLocal(signupRequest.getIsLocal())
                .areaCode(signupRequest.getAreaCode())
                .sigunguCode(signupRequest.getSigunguCode())
                .lastAccess(LocalDateTime.now())
                .build();

        Member newMember = memberService.save(member);

        return MemberResponse.builder()
                .id(newMember.getId())
                .email(newMember.getEmail())
                .name(newMember.getName())
                .gender(newMember.getGender())
                .birth(newMember.getBirth())
                .isLocal(newMember.getIsLocal())
                .areaCode(newMember.getAreaCode())
                .sigunguCode(newMember.getSigunguCode())
                .lastAccess(newMember.getLastAccess())
                .build();
    }

    @Transactional
    public void logout(PrincipalDetails principal) {
        memberService.deleteByMemberId(principal.getMember().getId());
    }


    public Page<MemberResponse> getByPageable(String name, String gender, String areaCode, String sigunguCode, String isLocal, Pageable pageable) {
        Page<Member> memberPage = memberService.getSearchByPageable(name, gender, areaCode,sigunguCode, isLocal, pageable);

        if (0 == memberPage.getTotalElements()) {
            return new PageImpl<>(new ArrayList<>(), memberPage.getPageable(), memberPage.getTotalElements());
        }

        List<MemberResponse> memberResponses = memberPage.stream().map(member -> MemberResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .gender(member.getGender())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .areaCode(member.getAreaCode())
                .sigunguCode(member.getSigunguCode())
                .lastAccess(member.getLastAccess())
                .introduceId(member.getIntroduceId())
                .build()).collect(Collectors.toList());

        return new PageImpl<>(memberResponses, memberPage.getPageable(), memberPage.getTotalElements());
    }

    // 내 프로필
    public MemberResponse me(PrincipalDetails principal) {
        Member member = memberService.getById(principal.getMember().getId());

        Introduce introduce = memberService.getByIntroduceId(member.getIntroduceId().getId());

        List<Post> posts = postService.getAllByUserId(member);
        return getMemberResponse(member, introduce, posts);
    }

    // 다른 회원 프로필
    public MemberResponse memberDetail(Long id) {
        Member member = memberService.getById(id);
        Introduce introduce = memberService.getByIntroduceId(member.getIntroduceId().getId());
        List<Post> posts = postService.getAllByUserId(member);
        return getMemberResponse(member, introduce, posts);
    }

    private MemberResponse getMemberResponse(Member member, Introduce introduce, List<Post> posts) {
        List<MemberPostResponse> memberPostResponses = posts.stream().map(post ->
                MemberPostResponse.builder()
                        .id(post.getId())
                        .memberId(post.getMemberId())
                        .title(post.getTitle())
                        .thumbnailImage(post.getThumbnailImage())
                        .createdAt(post.getCreatedAt())
                        .build()
        ).collect(Collectors.toList());
        return MemberResponse.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .gender(member.getGender())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .areaCode(member.getAreaCode())
                .sigunguCode(member.getSigunguCode())
                .lastAccess(member.getLastAccess())
                .introduceId(introduce)
                .posts(memberPostResponses)
                .build();
    }
}