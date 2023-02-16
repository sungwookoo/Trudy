package com.ssafy.trudy.member.service;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.*;
import com.ssafy.trudy.member.model.dto.MemberResponse;
import com.ssafy.trudy.member.repository.*;
import com.ssafy.trudy.upload.AwsS3Uploader;
import io.swagger.annotations.Api;
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
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.criteria.Predicate;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

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

    @Autowired
    private final BanRepository banRepository;

    @Autowired
    private AwsS3Uploader awsS3Uploader;

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

        memberRepository.save(member);
        refreshTokenRepository.deleteAll(refreshTokens);
    }

    public Page<Member> getSearchByPageable(String name, String gender, String areaCode, String sigunguCode, String isLocal, Pageable pageable) {
        return memberRepository.findAll(MemberSpecification.getSearchByPageable(name, gender, areaCode, sigunguCode, isLocal), pageable);
    }

    public Introduce getByIntroduceId(Long introduceId) {
        return introduceRepository.findById(introduceId).orElse(null);
    }

    //비밀번호 찾기
    public void modifyPassword() {

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

    // 현재 프로필 회원이 팔로우하고있는 회원 목록
    public Page<Follow> getFollowingByPageable(Long id, Pageable pageable) {
        Member member = memberRepository.findById(id).orElseThrow(() ->new ApiException(ServiceErrorType.NOT_FOUND));
        return followRepository.findAllByFollowFrom(member, pageable);
    }

    // 나 -> targetId 회원 팔로우 여부 : 했으면 true(팔로잉불가상태), 안했으면 false(팔로잉가능상태)
    public boolean isFollow(PrincipalDetails principal, Member targetMember) {
        return followRepository.existsByFollowFromAndFollowTo(principal.getMember(), targetMember);
    }


    // 팔로우
    public Member addFollow(Long target, Member member) {
        Follow follow = new Follow();
        follow.setFollowFrom(member);
        Member targetMember = memberRepository.findById(target).orElseThrow(()->new ApiException(ServiceErrorType.NOT_FOUND));
        follow.setFollowTo(targetMember);
        followRepository.save(follow);

        return targetMember;
    }

    // 언팔로우 (언팔로우 한 회원 리턴)
    public Member removeFollow(Long target, Member member) {
        Member targetMember = memberRepository.findById(target).orElseThrow(()->new ApiException(ServiceErrorType.NOT_FOUND));
        Follow follow = followRepository.findByFollowFromAndFollowTo(member, targetMember);
        followRepository.delete(follow);
        return targetMember;

    }

    // 차단 목록
    public Page<Ban> getBanByPageable(Member member, Pageable pageable) {
        return banRepository.findAllByBanFrom(member, pageable);
    }

    // 차단 여부
    public boolean isBan(Member fromMember, Member targetMember) {
        return banRepository.existsByBanFromAndBanTo(fromMember, targetMember);
    }

    // 차단 등록
    public Member addBan(Long target, Member member) {
        Ban ban = new Ban();
        ban.setBanFrom(member);
        Member targetMember = memberRepository.findById(target).orElseThrow(()->new ApiException(ServiceErrorType.NOT_FOUND));
        ban.setBanTo(targetMember);
        banRepository.save(ban);

        return targetMember;
    }

    // 차단 해제
    public Member removeBan(Long target, Member member) {
        Member targetMember = memberRepository.findById(target).orElseThrow(()->new ApiException(ServiceErrorType.NOT_FOUND));
        Ban ban = banRepository.findByBanFromAndBanTo(member, targetMember);
        banRepository.delete(ban);
        return targetMember;

    }

    public Map<String, String> createMemberFile(MultipartFile multipartFile, String dirName, PrincipalDetails principal) throws IOException {
        Member member = principal.getMember();
        // 이미지가 비어 있는 상태로 저장할 경우
        if(multipartFile == null || multipartFile.isEmpty()) {
            Map<String, String> map = new HashMap<>();
            awsS3Uploader.delete(member.getImageFileName());
            map.put("fileName", member.getImage());
            map.put("imageUrl", member.getImageFileName());
            return map;
        }

        Map<String, String> map = awsS3Uploader.createMemberFile(multipartFile, dirName, principal);
        member.setImageFileName(map.get("fileName"));
        member.setImage(map.get("imageUrl"));
        memberRepository.save(member);
        return map;
    }
}
