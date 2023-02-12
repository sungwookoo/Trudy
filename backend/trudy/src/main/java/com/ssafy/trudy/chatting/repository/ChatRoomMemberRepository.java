package com.ssafy.trudy.chatting.repository;

import com.ssafy.trudy.chatting.model.ChatRoom;
import com.ssafy.trudy.chatting.model.ChatRoomMember;
import com.ssafy.trudy.member.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    List<ChatRoomMember> findChatRoomMembersByMemberId(Member member);
    List<ChatRoomMember> findChatRoomMembersByChatRoomId(ChatRoom chatRoom);
    ChatRoomMember findChatRoomMemberByMemberIdAndChatRoomId(Member member, ChatRoom chatRoom);
}
