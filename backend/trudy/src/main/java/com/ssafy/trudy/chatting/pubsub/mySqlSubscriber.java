//package com.ssafy.trudy.chat.pubsub;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.trudy.chat.model.ChatMessage;
//import com.ssafy.trudy.chat.model.ChatRoom;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class mySqlSubscriber {
//
//    private final ObjectMapper objectMapper;
//    private final SimpMessageSendingOperations messageingTemplate;
//
//    /**
//     * mySql에서 메시지가 발행(publish)되면 대기하고 있던 mySql subscirber가 해당 메시지를 받아 처리한다.
//     */
//    public void sendMessage(String publishMessage) {
//        try {
//            // 1. ChatMessage 객체로 맵핑
//            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
//            // 2. 채팅메시지가 생성된 방 객체를 찾기
//            ChatRoom chatRoom = chatMessage.getRoomId();
//            // 3. 채팅방을 구독한 클라이언트에게 메시지 발송
//            messageingTemplate.convertAndSend("/sub/cat/room/" + chatRoom.getId(), chatMessage);
//        } catch (Exception e) {
//            log.error("Exception {}", e);
//        }
//    }
//}
