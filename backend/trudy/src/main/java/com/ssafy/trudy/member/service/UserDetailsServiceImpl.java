package com.ssafy.trudy.member.service;

import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public Member loadUserByUsername(String email) {
        return Optional.ofNullable(memberRepository.findByEmail(email)).orElseThrow(() -> new BadCredentialsException("이메일 주소를 확인해주세요."));
    }

}