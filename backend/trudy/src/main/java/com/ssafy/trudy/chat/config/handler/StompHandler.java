package com.ssafy.trudy.chat.config.handler;

import com.ssafy.trudy.auth.security.provider.TokenProvider;
import com.ssafy.trudy.chat.model.ChatMessage;
import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.repository.ChatRoomMembersRepository;
import com.ssafy.trudy.chat.repository.ChatRoomRepository;
import com.ssafy.trudy.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.w3c.dom.stylesheets.LinkStyle;

import java.security.Principal;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final ChatRoomMembersRepository chatRoomMembersRepository;

    private final ChatRoomRepository chatRoomRepository;
    private final TokenProvider tokenProvider;  // jwt 토큰
    private final ChatService chatService;  // 채팅방 정보

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청
            String jwtToken = accessor.getFirstNativeHeader("token");
            log.info("CONNECT {}", jwtToken);
            // Header의 jwt token 검증
            tokenProvider.validateToken(jwtToken);
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
            // header에서 구독 destination 정보를 얻고, roomId를 추출
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.
            // (나중에 특정 세션(클라이언트)이 어떤 채팅방에 들어가 있는지 알기 위함)
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            chatService.setUserEnterInfo(sessionId, roomId);
            // 채팅방 인원수를 +1
            chatService.plusUserCount(roomId);
            // 클라이언트 입장 메시지를 채팅방에 발송한다.(mySql publish)
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            // 채팅에 룸정보를 삽입하기 위해서 roomId로부터 room 객체를 찾기
            ChatRoom chatRoom = chatRoomRepository.findChatRoomById(Long.parseLong(roomId));
            // 채팅에 사용자 정보를 삽입
            chatService.sendChatMessage(ChatMessage.builder().type("ENTER").roomId(chatRoom).sender(name).build());
            log.info("SUBSCRIBED {} {}", name, roomId);
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sessionID로 채팅방 id를 얻는다. -> 방이 여러개면...?
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방의 인원수를 -1
            chatService.minusUserCount(roomId);
            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(mySql publish)
            // 채팅에 룸정보를 삽입하기 위해서 roomId로부터 room 객체를 찾기
            ChatRoom chatRoom = chatRoomRepository.findChatRoomById(Long.parseLong(roomId));
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            chatService.sendChatMessage(ChatMessage.builder().type("ENTER").roomId(chatRoom).sender(name).build());
            // 퇴장한 클라이언트의 roomId, sessionId 맵핑 정보를 삭제한다.
            chatService.removeUserEnterInfo(sessionId, roomId);
            log.info("DISCONNECTED {}, {}", sessionId, roomId);
        }
        return message;
    }
}
