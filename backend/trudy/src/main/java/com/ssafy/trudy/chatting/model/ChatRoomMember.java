package com.ssafy.trudy.chatting.model;

import com.ssafy.trudy.member.model.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "chat_room_members")
@NoArgsConstructor
public class ChatRoomMember {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoomId;

    // 1대 1 채팅방이기 때문에 채팅방이 하나 생성될 때 유저가 2개씩 생긴다.
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

}
