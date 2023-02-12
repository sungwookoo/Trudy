package com.ssafy.trudy.chatting.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.member.model.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatRoomResponse {
    // 채팅방 정보(id, 마지막 메시지 객체)
    private Long id;
    private ChatMessage lastMessageId;
    // 채팅 상대방의 정보
    private Member guestMember;

    @Builder
    public ChatRoomResponse(Long id, ChatMessage lastMessageId, Member guestMember) {
        this.id = id;
        this.lastMessageId = lastMessageId;
        this.guestMember = guestMember;
    }
}
