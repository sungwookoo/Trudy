package com.ssafy.trudy.member;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.model.MemberDto;
import com.ssafy.trudy.member.model.MemberRequest;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                        .area(memberRequest.getArea())
                        .birth(memberRequest.getBirth())
                        .isLocal(memberRequest.getIsLocal())
                        .isPublic(memberRequest.getIsPublic())
                        .role(memberRequest.getRole())
                        .build());
        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .image(member.getImage())
                .gender(member.getGender())
                .area(member.getArea())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .role(member.getRole())
                .lastAccess(member.getLastAccess())
                .build();
    }

    public MemberDto findMember(String email) {
        Member member = Optional.ofNullable(memberRepository.findByEmail(email)).orElseThrow(() -> new BadCredentialsException("회원 정보를 찾을 수 없습니다."));
        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .image(member.getImage())
                .gender(member.getGender())
                .area(member.getArea())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .role(member.getRole())
                .lastAccess(member.getLastAccess())
                .build();
    }

    public MemberDto findByEmailAndPassword(String email, String password) {
        Member member = Optional.ofNullable(memberRepository.findByEmail(email)).orElseThrow(() -> new BadCredentialsException("회원 정보를 찾을 수 없습니다."));
        if(!bCryptPasswordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        return MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .image(member.getImage())
                .gender(member.getGender())
                .area(member.getArea())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .role(member.getRole())
                .lastAccess(member.getLastAccess())
                .build();
    }

    public List<MemberDto> findAll() {
        return memberRepository
                .findAll().stream().map(member->MemberDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(member.getPassword())
                .name(member.getName())
                .image(member.getImage())
                .gender(member.getGender())
                .area(member.getArea())
                .birth(member.getBirth())
                .isLocal(member.getIsLocal())
                .isPublic(member.getIsPublic())
                .role(member.getRole())
                .lastAccess(member.getLastAccess())
                .build()).collect(Collectors.toList());
    }





    //구글 연동 회원가입
    public void addGoogle(){

    }

    //일반 로그인
    public void findLogin(){

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
