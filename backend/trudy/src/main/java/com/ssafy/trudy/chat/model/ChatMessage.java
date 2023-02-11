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
    public ChatMessage(MessageType type, ChatRoom roomId, Member memberId, String message){
        this.type = type;
        this.roomId = roomId;
        this.memberId = memberId;
        this.message = message;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "message")
    private String message;     // 메시지

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum MessageType {
        ENTER, TALK, QUIT
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private MessageType type;   // 메시지 타입

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;      // 방번호

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;      // 메시지 보낸 사람
}
