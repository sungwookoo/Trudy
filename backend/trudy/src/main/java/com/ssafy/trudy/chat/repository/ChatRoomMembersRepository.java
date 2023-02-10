package com.ssafy.trudy.chat.repository;

import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.model.ChatRoomMembers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomMembersRepository extends JpaRepository<ChatRoomMembers, Long> {

    List<ChatRoomMembers> findChatRoomMembersBySessionId(String sessionId);

    ChatRoomMembers findChatRoomMembersBySessionIdAndChatRoomId(String sessionId, ChatRoom roomId);
}
