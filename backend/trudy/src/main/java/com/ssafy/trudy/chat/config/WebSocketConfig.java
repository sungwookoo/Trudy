package com.ssafy.trudy.chat.config;

import com.ssafy.trudy.chat.config.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// handler를 이용하여 Websocket을 활성화하기 위한 config파일
@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker // Websocket, Stomp
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        // 메시지를 구독하는 요청의 prefix는 /sub으로 시작
        config.enableSimpleBroker("/sub");
        // 메시지를 발행하는 요청의 prefix는 /pub으로 시작
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        // stomp websocket의 연결 endpoint는 /ws-stomp로 설정
        // -> 개발서버 접속 주소는 ws://localhost:8080/ws-stomp
        registry.addEndpoint("/ws-stomp")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
