package com.ssafy.trudy.chat.model;

import com.ssafy.trudy.member.model.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

// 채팅 메시지 DTO
@Getter
@Setter
@Table(name = "chat_messages")
@NoArgsConstructor
public class ChatMessage {

    @Builder
    public ChatMessage(String type, ChatRoom roomId, Member memberId, String message, String sender, Long userCount){
        this.type = type;
        this.roomId = roomId;
        this.memberId = memberId;
        this.message = message;
        this.userCount = userCount;
        this.sender = sender;
    }
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "message")
    private String message;     // 메시지

    @Column(name = "image")
    private String image;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "type")
    private String type;   // 메시지 타입

    @Column(name = "user_count")
    private Long userCount;     // 채팅방 인원수, 채팅방 내에서 메시지가 전달될 때 인원수 갱신시 사용

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;      // 방번호

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;      // 메시지 보낸 사람

    @Column(name = "sender")
    private String sender;      // 보낸사람 이름


}
