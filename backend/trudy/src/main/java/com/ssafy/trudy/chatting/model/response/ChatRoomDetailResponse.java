package com.ssafy.trudy.chatting.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.member.model.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatRoomDetailResponse {

    // 채팅방 정보
    private Long id;
    private List<ChatMessage> chatMessageList;
    private LocalDateTime createdAt;

    // 로그인 유저 정보
    private Member loginMember;

    // 채팅 상대방의 정보
    private Member guestMember;
}
