package com.ssafy.trudy.chat.model;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

// 채팅방 구현
@Getter
@Setter
@Entity
@Table(name = "chat_rooms")
@DynamicUpdate
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    // chatMessage에서 찾아오기
    @Column(name = "last_message_id")
    private Long lastMessageId;     // 채팅방 마지막 메시지의 id값

    @Column(name = "created_at")
    private LocalDateTime createdAt;    // 채팅방 생성 시각
}
