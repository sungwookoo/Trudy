package com.ssafy.trudy.auth.security.config;

import com.ssafy.trudy.auth.oauth2.CustomOAuth2UserService;
import com.ssafy.trudy.auth.security.entrypoint.JwtAuthenticationEntryPoint;
import com.ssafy.trudy.auth.security.fillter.JwtFilter;
import com.ssafy.trudy.auth.security.handler.JwtAccessDeniedHandler;
import com.ssafy.trudy.auth.security.provider.TokenProvider;
import com.ssafy.trudy.member.model.MemberRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	@Autowired
	private JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final CustomOAuth2UserService customOAuth2UserService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/static/css/**, /static/js/**, *.ico"); // swagger
        web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources", "/configuration/security", "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }

    @Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()

				.exceptionHandling()
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler)

				.and()
				.headers()
				.frameOptions()
				.sameOrigin()

				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/login", "/signup", "/reissuance", "/swagger-ui/**", "/swagger-resources/**","/","/**").permitAll()
//				.antMatchers("/api/**").hasRole(MemberRole.MEMBER.name())
                .anyRequest().authenticated()
				.and()
				.logout().logoutSuccessUrl("/");
//				.and()
//				.oauth2Login()
//				.userInfoEndpoint()
//				.userService(customOAuth2UserService)
//				.and()
//				.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class)
				.oauth2Login()
				.userInfoEndpoint()
				.userService(customOAuth2UserService);
	}
}
