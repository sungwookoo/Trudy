package com.ssafy.trudy.chat.repository;

import com.ssafy.trudy.chat.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 모든 채팅방 조회 -> 추후에 생성 역순으로
    List<ChatRoom> findAllByOrderByCreatedAtDesc();

    // 이름으로 채팅방 조회
    List<ChatRoom> findChatRoomsByNameContaining(String keyword);

    // roomId 로 채팅방 조회
    ChatRoom findChatRoomById(Long id);


}
