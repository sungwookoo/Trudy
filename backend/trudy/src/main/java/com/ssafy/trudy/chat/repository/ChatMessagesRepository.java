package com.ssafy.trudy.chat.repository;

import com.ssafy.trudy.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessagesRepository extends JpaRepository<ChatMessage, Long> {
}
