package com.ssafy.trudy.model.chat;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    private String message;

    private String image;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}
