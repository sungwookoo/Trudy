package com.ssafy.trudy.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepository extends JpaRepository<com.ssafy.trudy.chat.model.ChatRoomMember, Long> {
}
