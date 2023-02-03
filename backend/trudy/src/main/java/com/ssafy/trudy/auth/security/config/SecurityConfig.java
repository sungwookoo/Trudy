package com.ssafy.trudy.auth.security.config;

import com.ssafy.trudy.auth.security.entrypoint.JwtAuthenticationEntryPoint;
import com.ssafy.trudy.auth.security.fillter.JwtFilter;
import com.ssafy.trudy.auth.security.handler.JwtAccessDeniedHandler;
import com.ssafy.trudy.auth.security.provider.TokenProvider;
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
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	@Autowired
	private JwtAccessDeniedHandler jwtAccessDeniedHandler;

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
                .antMatchers("/login", "/signup", "/reissuance", "/h2/**", "/swagger-ui/**", "/swagger-resources/**","/","/**").permitAll()
                .anyRequest().authenticated()

				.and()
				.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);;
	}
}
