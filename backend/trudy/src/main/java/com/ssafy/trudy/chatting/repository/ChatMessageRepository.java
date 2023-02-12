package com.ssafy.trudy.chatting.repository;

import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.chatting.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomIdOrderByCreatedAtDesc(ChatRoom roomId);
}