package com.ssafy.trudy.chat.model;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

// 채팅방 구현
@Getter
@Setter
@Entity
@Table(name = "chat_rooms")
@NoArgsConstructor
public class ChatRoom implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "created_at")
    private LocalDateTime createdAt;    // 채팅방 생성 시각

    @Column(name = "name")
    private String name;    // 채팅방 이름


    @Column(name = "user_count")
    private Long userCount;     // 채팅방 인원수

    @Column(name = "last_message_id")
    private Long lastMessageId;     // 채팅방 마지막 메시지

    public static ChatRoom create(String name) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.name = name;
        chatRoom.createdAt = LocalDateTime.now();
        return chatRoom;
    }
}
