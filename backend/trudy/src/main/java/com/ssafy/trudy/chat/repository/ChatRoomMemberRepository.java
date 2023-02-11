package com.ssafy.trudy.chat.repository;

import com.ssafy.trudy.chat.model.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
}
