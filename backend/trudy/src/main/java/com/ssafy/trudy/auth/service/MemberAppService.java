package com.ssafy.trudy.auth.service;

import com.ssafy.trudy.auth.dto.request.LoginRequest;
import com.ssafy.trudy.auth.dto.request.SignupRequest;
import com.ssafy.trudy.auth.dto.request.TokenRequest;
import com.ssafy.trudy.auth.dto.response.TokenResponse;
import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.auth.security.provider.TokenProvider;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.*;
import com.ssafy.trudy.member.model.dto.*;
import com.ssafy.trudy.member.service.MemberService;
import com.ssafy.trudy.post.model.Post;
import com.ssafy.trudy.post.service.PostService;
import com.ssafy.trudy.upload.AwsS3Uploader;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

    @Transactional
    public MemberIntroResponse modifyMemberIntro(PrincipalDetails principal, MemberIntroRequest modifyIntroRequest) {
        Member member = memberService.getById(principal.getMember().getId());
        Introduce introduce = member.getIntroduceId();
        introduce.setTitle(modifyIntroRequest.getTitle());
        introduce.setPlan(modifyIntroRequest.getPlan());
        introduce.setSelf(modifyIntroRequest.getSelf());
        introduce.setLanguage(modifyIntroRequest.getLanguage());
        introduce.setFacebook(modifyIntroRequest.getFacebook());
        introduce.setInstagram(modifyIntroRequest.getInstagram());
        introduce.setTwitter(modifyIntroRequest.getTwitter());
        introduce.setGithub(modifyIntroRequest.getGithub());

        Introduce modifiedIntroduce = memberService.saveIntroduce(introduce);

        return MemberIntroResponse.builder()
                .title(modifiedIntroduce.getTitle())
                .plan(modifyIntroRequest.getPlan())
                .self(modifyIntroRequest.getSelf())
                .language(modifyIntroRequest.getLanguage())
                .facebook(modifiedIntroduce.getFacebook())
                .instagram(modifiedIntroduce.getInstagram())
                .twitter(modifiedIntroduce.getTwitter())
                .github(modifiedIntroduce.getGithub())
                .build();
    }

    public String isSignupDupName(String name) {
        if(memberService.nameCheck(name)) {
            return "1";
        }
        return "0";
    }

    public String isModifyDupName(PrincipalDetails principal, String name) {
        Member member = memberService.getById(principal.getMember().getId());
        if(!member.getName().equals(name) && memberService.nameCheck(name)) {
            return "1";
        }
        else return "0";
    }

    @Transactional
    public MemberResponse modifyMember(PrincipalDetails principal, MemberModifyRequest modifyRequest) {
//        modifyRequest.validation();

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
                .image(modifiedMember.getImage())
                .areaCode(modifiedMember.getAreaCode())
                .sigunguCode(modifiedMember.getSigunguCode())
                .lastAccess(modifiedMember.getLastAccess())
                .build();

    }

    @Transactional
    public MemberResponse signup(SignupRequest signupRequest) {
//        signupRequest.validation();

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
    public void logout(Long id) {
        memberService.deleteByMemberId(id);
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
                .image(member.getImage())
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
        return getMemberResponse(member, introduce, posts, principal);
    }

    // 다른 회원 프로필
    public MemberResponse memberDetail(PrincipalDetails principal, Long id) {
        Member member = memberService.getById(id);
        List<Post> posts = postService.getAllByUserId(member);
        Introduce introduce = memberService.getByIntroduceId(member.getIntroduceId().getId());
        return getMemberResponse(member, introduce, posts, principal);
    }

    // 회원 이미지 저장
    public MemberResponse saveMemberImage(String uploadImageUrl, String fileName, PrincipalDetails principal) {
        Member member = principal.getMember();
        List<Post> posts = postService.getAllByUserId(member);
        Introduce introduce = memberService.getByIntroduceId(member.getIntroduceId().getId());
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
                .image(uploadImageUrl)
                .imageFileName(fileName)
                .birth(member.getBirth())
                .lastAccess(member.getLastAccess())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .introduceId(introduce)
                .areaCode(member.getAreaCode())
                .sigunguCode(member.getSigunguCode())
                .email(member.getEmail())
                .posts(memberPostResponses)
                .build();
    }

    private MemberResponse getMemberResponse(Member member, Introduce introduce, List<Post> posts, PrincipalDetails principal) {
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
                .isPublic(member.getIsPublic())
                .areaCode(member.getAreaCode())
                .sigunguCode(member.getSigunguCode())
                .lastAccess(member.getLastAccess())
                .introduceId(introduce)
                .posts(memberPostResponses)
                .image(member.getImage())
                .isBan(isBan(principal, member))
                .isFollow(isFollow(principal, member))
                .build();
    }

    public MemberResponse changePublicState(PrincipalDetails principal) {
        Member member = principal.getMember();
        List<Post> posts = postService.getAllByUserId(member);
        Introduce introduce = memberService.getByIntroduceId(member.getIntroduceId().getId());
        memberService.changePublicState(member);
        return getMemberResponse(member, introduce, posts, principal);

    }

    public boolean emailCheck(String email) {
        return memberService.emailCheck(email);
    }


    public Page<MemberResponse> getByFollowerPageable(Long id, Pageable pageable, PrincipalDetails principal) {
        Page<Follow> memberPage = memberService.getFollowerByPageable(id, pageable);
        if (0 == memberPage.getTotalElements()) {
            return new PageImpl<>(new ArrayList<>(), memberPage.getPageable(), memberPage.getTotalElements());
        }

        List<MemberResponse> memberResponses = memberPage.stream().map(member -> MemberResponse.builder()
                .id(member.getFollowFrom().getId())
                .email(member.getFollowFrom().getEmail())
                .name(member.getFollowFrom().getName())
                .gender(member.getFollowFrom().getGender())
                .birth(member.getFollowFrom().getBirth())
                .isLocal(member.getFollowFrom().getIsLocal())
                .image(member.getFollowFrom().getImage())
                .areaCode(member.getFollowFrom().getAreaCode())
                .sigunguCode(member.getFollowFrom().getSigunguCode())
                .lastAccess(member.getFollowFrom().getLastAccess())
                .introduceId(member.getFollowFrom().getIntroduceId())
                .isFollow(isFollow(principal, member.getFollowFrom()))
                .build()).collect(Collectors.toList());

        return new PageImpl<>(memberResponses, memberPage.getPageable(), memberPage.getTotalElements());
    }

    public Page<MemberResponse> getByFollowingPageable(Long id, Pageable pageable, PrincipalDetails principal) {
        Page<Follow> memberPage = memberService.getFollowingByPageable(id, pageable);
        if (0 == memberPage.getTotalElements()) {
            return new PageImpl<>(new ArrayList<>(), memberPage.getPageable(), memberPage.getTotalElements());
        }

        List<MemberResponse> memberResponses = memberPage.stream().map(member -> MemberResponse.builder()
                .id(member.getFollowTo().getId())
                .email(member.getFollowTo().getEmail())
                .name(member.getFollowTo().getName())
                .gender(member.getFollowTo().getGender())
                .birth(member.getFollowTo().getBirth())
                .isLocal(member.getFollowTo().getIsLocal())
                .image(member.getFollowTo().getImage())
                .areaCode(member.getFollowTo().getAreaCode())
                .sigunguCode(member.getFollowTo().getSigunguCode())
                .lastAccess(member.getFollowTo().getLastAccess())
                .introduceId(member.getFollowTo().getIntroduceId())
                .isFollow(isFollow(principal, member.getFollowTo()))
                .build()).collect(Collectors.toList());

        return new PageImpl<>(memberResponses, memberPage.getPageable(), memberPage.getTotalElements());
    }

    private String isFollow( PrincipalDetails principal, Member targetMember) {
        if(Objects.equals(principal.getMember().getId(), targetMember.getId())) {
            return "me";
        }
        return memberService.isFollow(principal, targetMember)?"follow":"none-follow";
    }
    public MemberResponse addFollow(Long id, PrincipalDetails principal) {
        Member member = principal.getMember();
        Member targetMember = memberService.addFollow(id, member);
        return MemberResponse.builder()
                .name(targetMember.getName())
                .build();

    }


    public MemberResponse removeFollow(Long id, PrincipalDetails principal) {
        Member member = principal.getMember();
        Member targetMember = memberService.removeFollow(id, member);
        return MemberResponse.builder()
                .name(targetMember.getName())
                .build();

    }



    public Page<MemberResponse> getByBanPageable(Pageable pageable, PrincipalDetails principal) {
        Page<Ban> memberPage = memberService.getBanByPageable(principal.getMember(),pageable);
        if (0 == memberPage.getTotalElements()) {
            return new PageImpl<>(new ArrayList<>(), memberPage.getPageable(), memberPage.getTotalElements());
        }

        List<MemberResponse> memberResponses = memberPage.stream().map(member -> MemberResponse.builder()
                .id(member.getBanTo().getId())
                .email(member.getBanTo().getEmail())
                .name(member.getBanTo().getName())
                .gender(member.getBanTo().getGender())
                .birth(member.getBanTo().getBirth())
                .isLocal(member.getBanTo().getIsLocal())
                .areaCode(member.getBanTo().getAreaCode())
                .sigunguCode(member.getBanTo().getSigunguCode())
                .lastAccess(member.getBanTo().getLastAccess())
                .introduceId(member.getBanTo().getIntroduceId())
                .isBan(isBan(principal, member.getBanTo()))
                .build()).collect(Collectors.toList());

        return new PageImpl<>(memberResponses, memberPage.getPageable(), memberPage.getTotalElements());
    }

    private String isBan( PrincipalDetails principal, Member targetMember) {
        Member member = principal.getMember();
        if(Objects.equals(principal.getMember().getId(), targetMember.getId())) {
            return "me";
        }
        return memberService.isBan(member, targetMember)?"ban":"none-ban";
    }

    public MemberResponse addBan(Long id, PrincipalDetails principal) {
        Member member = principal.getMember();
        Member targetMember = memberService.addBan(id, member);
        return MemberResponse.builder()
                .name(targetMember.getName())
                .build();
    }

    public MemberResponse removeBan(Long id, PrincipalDetails principal) {
        Member member = principal.getMember();
        Member targetMember = memberService.removeBan(id, member);
        return MemberResponse.builder()
                .name(targetMember.getName())
                .build();

    }

    public Map<String, String> createMemberFile(MultipartFile multipartFile, String dirName, PrincipalDetails principal) throws IOException {
        return memberService.createMemberFile(multipartFile, dirName, principal);
    }
}