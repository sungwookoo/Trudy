package com.ssafy.trudy.chatting.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.trudy.member.model.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

// 채팅 메시지 DTO
@Entity
@Getter
@Setter
@Table(name = "chat_messages")
@NoArgsConstructor
public class ChatMessage{

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;

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
    @JoinColumn(name = "member_id")
    private Member memberId;      // 메시지 보낸 사람

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member receiverId;

    public String getReceiverId(ChatMessage chatMessage) {
        return chatMessage.getMemberId().getId().toString();
    }
    @Builder
    public ChatMessage(MessageType type, Member memberId, String message, ChatRoom roomId){
        this.type = type;
        this.roomId = roomId;
        this.memberId = memberId;
//        this.receiverId = receiverId;
        this.message = message;
    }

}