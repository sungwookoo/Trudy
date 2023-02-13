package com.ssafy.trudy.chatting.controller;

import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping
public class ChatMessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatService;

    // 클라이언트에서 api/chat/send로 메시지를 발행하므로 메시지를 처리하기 위해
    // ChatMessageController에서 @MessageMapping을 이용해받아준다.
    // 받은 메시지를 데이터베이스에 저장하기 위해서 messageService의 sendMessage메소드를 호출
    // messageingTemplate의 converANdSend 메소드를 통해
    // topic/chat/수신자ID를 구독한 유저에게 해당 메세지를 보낸다.
    @MessageMapping("/chat/send")
    public void chat(@RequestBody ChatMessage chatMessage) {
        chatService.sendChatMessage(chatMessage);
        // 채팅방만들고

        // 해당 채팅방에 메시지
        messagingTemplate.convertAndSend("/topic/chat/room/" + chatMessage.getRoomId().getId(), chatMessage);
        // 해당 방에만 메시지 객체가 전달되게 된다. - DB에 저장도 됨
    }
}
