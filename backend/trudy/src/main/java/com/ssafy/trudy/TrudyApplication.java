package com.ssafy.trudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableJpaAuditing
@SpringBootApplication
@CrossOrigin("*")
public class TrudyApplication {

	static {
		/*
		여기서의 핵심은 com.amazonaws.sdk.disableEc2Metadata 속성을 true로 설정해주는것입니다.
		만약 해당 설정을 하지 않을 경우 서비스가 실행되는 시점에 약간의 지연이 발생하고 예외 메세지가 발생
		*/
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}

	public static void main(String[] args) {
		SpringApplication.run(TrudyApplication.class, args);
	}

}
