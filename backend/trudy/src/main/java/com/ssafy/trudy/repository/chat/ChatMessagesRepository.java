package com.ssafy.trudy.repository.chat;

import com.ssafy.trudy.model.chat.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessagesRepository extends JpaRepository<ChatMessage, Long> {
}
