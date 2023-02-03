package com.ssafy.trudy.auth.service;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PrincipalDetailsService implements UserDetailsService {

	@Autowired
	private MemberService memberService;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Member member = memberService.getByEmail(email);
		if(member == null) {
			return null;
		}else {
			return new PrincipalDetails(member);
		}
	}

}
