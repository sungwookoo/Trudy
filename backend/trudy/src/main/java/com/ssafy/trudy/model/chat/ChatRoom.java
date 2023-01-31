package com.ssafy.trudy.model.chat;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chat_rooms")
public class ChatRoom {
    
    @Id
    @GeneratedValue
    private Long id;
    
    @Column(name = "last_message_id")
    private int lastMessageId;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
