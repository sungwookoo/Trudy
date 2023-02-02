package com.ssafy.trudy.member.service;

import com.ssafy.trudy.member.model.*;
import com.ssafy.trudy.member.repository.MemberRepository;
import com.ssafy.trudy.member.repository.SearchMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    //일반 회원 가입
    public MemberDto createMember(MemberRequest memberRequest){
        Member member = memberRepository.save(
                Member.builder()
                        .email(memberRequest.getEmail())
                        .password(bCryptPasswordEncoder.encode(memberRequest.getPassword()))
                        .name(memberRequest.getName())
                        .gender(memberRequest.getGender())
                        .areaCode(memberRequest.getAreaCode())
                        .sigunguCode(memberRequest.getSigunguCode())
                        .birth(memberRequest.getBirth())
                        .isLocal(memberRequest.getIsLocal())
                        .isPublic(memberRequest.getIsPublic())
                        .role(MemberRole.MEMBER)
                        .lastAccess(LocalDateTime.now())
                        .build());

        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .image(member.getImage())
                .gender(member.getGender())
                .areaCode(member.getAreaCode())
                .sigunguCode(member.getSigunguCode())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .build();
    }

    public List<MemberDto> findAll() {
        int page = 2;
        int size = 10;
        Pageable limit = PageRequest.of(page * size,size);
        memberRepository.findAll(limit);
        return memberRepository
                .findAll(limit).stream().map(member->MemberDto.builder()
                        .id(member.getId())
                        .email(member.getEmail())
                        .password(member.getPassword())
                        .name(member.getName())
                        .image(member.getImage())
                        .gender(member.getGender())
                        .areaCode(member.getAreaCode())
                        .sigunguCode(member.getSigunguCode())
                        .birth(member.getBirth())
                        .isLocal(member.getIsLocal())
                        .isPublic(member.getIsPublic())
                        .build()).collect(Collectors.toList());
    }


    // 정보 수정
    public ResponseEntity<MemberDto> modifyMember(Long id, MemberRequest memberRequest) {
        Optional<Member> memberData = memberRepository.findById(id);
        if (memberData.isPresent()) {
            Member member = memberData.get();
            member.setName(memberRequest.getName());
            member.setBirth(memberRequest.getBirth());
            member.setGender(memberRequest.getGender());
            member.setRole(memberRequest.getRole());
            member.setIsLocal(memberRequest.getIsLocal());
            member.setIsPublic(memberRequest.getIsPublic());
            member.setAreaCode(memberRequest.getAreaCode());
            member.setSigunguCode(memberRequest.getSigunguCode());
            return new ResponseEntity<>(entityToDto(memberRepository.save(member)), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 회원 삭제
    public MemberDto deleteMember(Long id) {
        return null;
    }

    public MemberInfoDto findMember(String email) {
        Member member = Optional.ofNullable(memberRepository.findByEmail(email)).orElseThrow(() -> new BadCredentialsException("회원 정보를 찾을 수 없습니다."));
        return new MemberInfoDto(member);
    }

    public MemberLoginDto findByEmailAndPassword(String email, String password) {
        Member member = Optional.ofNullable(memberRepository.findByEmail(email)).orElseThrow(() -> new BadCredentialsException("회원 정보를 찾을 수 없습니다."));
        if(!bCryptPasswordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        return MemberLoginDto.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .role(member.getRole())
                .build();
    }

    public MemberDto entityToDto(Member member) {
        return new MemberDto(member.getId(), member.getEmail(), member.getPassword(), member.getName(), member.getImage(), member.getGender(), member.getAreaCode(), member.getSigunguCode(), member.getBirth(), member.getIsLocal(), member.getIsPublic());
    }

    public String findEmailById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new BadCredentialsException("회원 정보를 찾을 수 없습니다.")).getEmail();
    }




    //구글 연동 회원가입
    public void addGoogle(){

    }

    //비밀번호 찾기
    public void modifyPassword(){

    }

    //회원 정보 수정
    public void modifyMember(){

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
