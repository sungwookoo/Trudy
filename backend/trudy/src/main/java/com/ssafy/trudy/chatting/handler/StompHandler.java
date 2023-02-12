package com.ssafy.trudy.chatting.handler;

import com.ssafy.trudy.auth.security.provider.TokenProvider;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.access.AccessDeniedException;

public class StompHandler implements ChannelInterceptor {
    private final TokenProvider tokenProvider;

    public StompHandler(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    // preSend 메서드에서 클라이언트가 CONNECT할 때, 헤더로 보낸 Authorization에 담긴
    // jwt Token을 검증하도록 한다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT) {
            if(!tokenProvider.validateToken(accessor.getFirstNativeHeader("Authorization")))
                throw new AccessDeniedException("");
        }
        return message;
    }

}
