package com.ssafy.trudy.chat.controller;

import com.ssafy.trudy.auth.security.dto.PrincipalDetails;
import com.ssafy.trudy.chat.model.ChatMessage;
import com.ssafy.trudy.chat.repository.ChatRoomRepository;
import com.ssafy.trudy.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

// MessageMapping: WebSocket으로 들어오는 메시지 발행을 처리
@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatController {
    private final ChatRoomRepository chatRoomRepository;

    private final ChatService chatService;


    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {

        // Websocket에 발행된 메시지를 mySQL로 발행(publish)
        chatService.sendChatMessage(message);
    }
}
