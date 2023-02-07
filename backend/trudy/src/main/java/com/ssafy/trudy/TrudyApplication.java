package com.ssafy.trudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TrudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrudyApplication.class, args);
	}

}
