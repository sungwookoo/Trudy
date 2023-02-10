package com.ssafy.trudy.chat.model;

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
public class ChatRoomMembers {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoomId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

    @Column(name = "session_id")
    private String sessionId;
    // 클라이언트의 sessionId. header로부터 받는값 -> memberId와는 다름
    // memberId는 header에 담기지 않기 때문에 session을 담을 변수이다.
}
