package com.ssafy.trudy.repository.chat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepository extends JpaRepository<com.ssafy.trudy.model.chat.ChatRoomMember, Long> {
}
