package com.ssafy.trudy.model.chat;

import com.ssafy.trudy.model.member.Member;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "chat_room_members")
public class ChatRoomMember {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoomId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
}
