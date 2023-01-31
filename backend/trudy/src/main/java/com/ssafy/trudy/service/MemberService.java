package com.ssafy.trudy.service;

import com.ssafy.trudy.model.member.Member;
import com.ssafy.trudy.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    //일반 회원 가입
    public void addMember(Member member){

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

    //회원 목록 가져오기
    public void findMemberList(){

    }



}
