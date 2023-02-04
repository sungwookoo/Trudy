package com.ssafy.trudy.auth.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.trudy.exception.ApiErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType( MediaType.APPLICATION_JSON_VALUE );

        ApiErrorResponse apiErrorResponse = new ApiErrorResponse();
        apiErrorResponse.setErrorMessage(accessDeniedException.getMessage());
        apiErrorResponse.setErrorCode(HttpServletResponse.SC_FORBIDDEN);

        response.sendError(HttpServletResponse.SC_FORBIDDEN, objectMapper.writeValueAsString(apiErrorResponse));
    }
}
