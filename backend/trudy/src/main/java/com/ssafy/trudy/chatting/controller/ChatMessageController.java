package com.ssafy.trudy.chatting.controller;

import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.chatting.model.Message;
import com.ssafy.trudy.chatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping
public class ChatMessageController {

    @Autowired
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message recieveMessage(@Payload Message message) { return message; }

    // 클라이언트에서 app/chat/send로 메시지를 발행하므로 메시지를 처리하기 위해
    // ChatMessageController에서 @MessageMapping을 이용해받아준다.
    // 받은 메시지를 데이터베이스에 저장하기 위해서 messageService의 sendMessage메소드를 호출
    // messageingTemplate의 converANdSend 메소드를 통해
    // topic/chat/수신자ID를 구독한 유저에게 해당 메세지를 보낸다.
    @MessageMapping("/private-message")
    public Message chat(@RequestBody Message message) {
        simpMessagingTemplate.convertAndSendToUser(message.getRecieverName(),"/private",message);
        return message;
    }
}
