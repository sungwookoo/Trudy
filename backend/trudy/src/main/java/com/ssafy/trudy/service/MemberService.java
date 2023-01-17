package com.ssafy.trudy.service;

import com.ssafy.trudy.model.Member;
import com.ssafy.trudy.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class MemberService {
    @Autowired
    MemberRepository memberRepository;

    public List<Member> allMembers() {
        return memberRepository.findAll();
    }

}
