package com.ssafy.trudy.service;

import com.ssafy.trudy.model.member.Member;
import com.ssafy.trudy.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

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

    //회원 목록 가져오기 - 조회시 최근 접속일자를 내림차순
    public List<Member> findMemberList(){
        return memberRepository.findMemberList();
    }

    // 필터된 회원 목록 가져오기
//    public List<Member> findMemberListFilted() { return memberRepository.findMemberListFiltered(); }


}
