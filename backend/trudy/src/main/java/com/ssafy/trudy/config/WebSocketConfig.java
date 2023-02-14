package com.ssafy.trudy.config;

import com.ssafy.trudy.chatting.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//    private final StompHandler stompHandler;

    // configureMessageBroker
    // enableSimpleBroker를 통해 메시지 브로커가 /topic으로 시작하는 주소를 구독한
    // Subscriber들에게 메시지를 전달하도록 한다.
    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/chatroom","/user");
        registry.setUserDestinationPrefix("/user");
        // setApplicationDestinationPrefixs: 클라이언트가 서버로 메시지를 발송할 수 있는
        // 경로의 prefix를 지정한다.
    }

    // registerStompEndpionts: 소켓에 연결하기 위한 엔드포인트를 지정해준다.
    // cors를 피하기 위해 AllowedOriginPatterns를 *으로 지정해줌
    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    // configureClientInboundChannel: jwt 토큰 검증을 위해 생성한 stompHandler를 인터셉터로 지정
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler);
//    }
}
