package com.ssafy.trudy.auth.oauth2;

import com.ssafy.trudy.auth.oauth2.dto.OAuthAttributes;
import com.ssafy.trudy.auth.oauth2.dto.SessionUser;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        /* registrationId
         * 현재 로그인 진행 중인 서비스 구분하는 코드.
         * 이후에 여러가지 추가할 때 네이버인지 구글인지 구분
         */
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        /* userNameAttributeName
         * OAuth2 로그인 진행 시 키가 되는 필드값 (=Primary Key)
         * 구글 기본 코드: sub, 네이버 카카오 등은 기본 지원 x
         * 이후 네이버, 구글 로그인 동시 지원시 사용
         */
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        /* OAuthAttributes
         * OAuth2UserService를 통해 가져온 OAuth2User의 attribute
         * 네이버 등 다른 소셜 로그인도 이 클래스 사용
         */
        OAuthAttributes attributes = OAuthAttributes.
                of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Member member = saveOrUpdate(attributes);

        /* SessionUser
         * 세션에 사용자 정보를 저장하기 위한 dto 클래스
         * (User 클래스를 사용하지 않고 새로 만들었다.)
         */
        httpSession.setAttribute("user", new SessionUser(member));

        Collection<SimpleGrantedAuthority> authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return new DefaultOAuth2User(
                authorities,
                attributes.getAttributes(),
                attributes.getNameAttributeKey());
    }

    private Member saveOrUpdate(OAuthAttributes attributes) {
        Member member = memberRepository.findByEmail(attributes.getEmail())
                .map(entity-> entity.update(attributes.getName(), attributes.getPicture()))
                .orElse(attributes.toEntity());

        return memberRepository.save(member);
    }

}