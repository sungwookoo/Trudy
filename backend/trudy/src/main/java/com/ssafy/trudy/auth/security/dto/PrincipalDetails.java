package com.ssafy.trudy.auth.security.dto;

import com.ssafy.trudy.member.model.Member;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
@Builder
public class PrincipalDetails implements UserDetails{

	private static final long serialVersionUID = 1L;
	private Member member;

	public PrincipalDetails(Member member) {
		this.member = member;
	}

	public Member getMember() {
		return member;
	}

	@Override
	public String getPassword() {
		return member.getPassword();
	}

	@Override
	public String getUsername() {
		return member.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collet = new ArrayList<GrantedAuthority>();
		member.getRoles().forEach(memberRole -> {
			collet.add(memberRole::name);
		});
		return collet;
	}
}
