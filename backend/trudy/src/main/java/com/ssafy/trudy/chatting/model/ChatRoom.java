package com.ssafy.trudy.chatting.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.trudy.post.model.Comment;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// 채팅방 구현

@Getter
@Setter
@Entity
@Table(name = "chat_rooms")
@DynamicUpdate
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties("chatList")
public class ChatRoom implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "roomId", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<ChatMessage> chatList = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;    // 채팅방 생성 시각
}
