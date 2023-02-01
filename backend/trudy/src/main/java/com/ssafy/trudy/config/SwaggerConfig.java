package com.ssafy.trudy.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.models.OpenAPI;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springdoc.core.GroupedOpenApi;

@OpenAPIDefinition(
        info = @Info(title = "TRUDY API 명세서",
                description = "TRUDY API 명세서",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi chatOpenApi() {
        String[] paths = {"/api/**"};

        return GroupedOpenApi.builder()
                .group("TRUDY API v1")
                .pathsToMatch(paths)
                .build();
    }
}

    /*@OpenAPIDefinition(
            info = @Info(title = "TRUDY API 명세서",
                    description = "API 명세서",
                    version = "v1",
                    contact = @Contact(name = "trudy", email = "sungwookoo.dev@gmail.com"),
                    license = @License(name = "Apache 2.0",
                            url = "http://www.apache.org/licenses/LICENSE-2.0.html")
            )
    )
    @RequiredArgsConstructor
    @Configuration
    public class OpenApiConfig {
        *//**
 * @return GroupedOpenApi
 *//*
        @Bean
        public GroupedOpenApi postOpenAPI() {
            String[] paths = {"/post/**"};
            return GroupedOpenApi.builder().group("게시글 관련 API").pathsToMatch(paths)
                    .build();
        }

        @Bean
        public OpenAPI springShopOpenAPI() {
            return new OpenAPI()
                    .info(new io.swagger.v3.oas.models.info.Info().title("포스트 API")
                            .description("OpenAPI @@")
                            .version("v0.0.1"));
        }
    }
}*/
