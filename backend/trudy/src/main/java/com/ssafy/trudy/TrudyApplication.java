package com.ssafy.trudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin("*")
public class TrudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrudyApplication.class, args);
	}

}
