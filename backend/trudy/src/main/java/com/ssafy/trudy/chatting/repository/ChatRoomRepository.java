package com.ssafy.trudy.chatting.repository;

import com.ssafy.trudy.chatting.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 모든 채팅방 조회 -> 추후에 생성 역순으로
    List<ChatRoom> findAllByOrderByCreatedAtDesc();
    // roomId 로 채팅방 조회
    ChatRoom findChatRoomById(Long id);
}
