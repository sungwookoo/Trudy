package com.ssafy.trudy.chatting.service;

import com.ssafy.trudy.chatting.model.ChatMessage;
import com.ssafy.trudy.chatting.model.response.ChatRoomDetailResponse;
import com.ssafy.trudy.chatting.repository.ChatMessageRepository;
import com.ssafy.trudy.chatting.model.ChatRoom;
import com.ssafy.trudy.chatting.model.ChatRoomMember;
import com.ssafy.trudy.chatting.model.response.ChatRoomResponse;
import com.ssafy.trudy.chatting.repository.ChatRoomMemberRepository;
import com.ssafy.trudy.chatting.repository.ChatRoomRepository;
import com.ssafy.trudy.exception.ApiException;
import com.ssafy.trudy.exception.ServiceErrorType;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomMemberRepository chatRoomMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    //****************************[CREATE]*******************************//
    /**
     * 채팅방 생성 + 중개테이블에도 정보를 저장
     */
    public void createChatRoom(Member roomMaker, Member guest){
        // 1. 채팅방 객체 생성
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setCreatedAt(LocalDateTime.now());
        // 2. 채팅방을 디비에 넣기
        chatRoomRepository.save(chatRoom);
        // 3. 채팅방 - 멤버 중개테이블 생성(2개 만들어서 집어넣어야함)
        ChatRoomMember chatRoomMember_1 = new ChatRoomMember();
        chatRoomMember_1.setMemberId(roomMaker);
        chatRoomMember_1.setChatRoomId(chatRoom);
        ChatRoomMember chatRoomMember_2 = new ChatRoomMember();
        chatRoomMember_2.setMemberId(guest);
        chatRoomMember_2.setChatRoomId(chatRoom);
        // 4. 채팅방 - 멤버 중개테이블 저장
        chatRoomMemberRepository.save(chatRoomMember_1);
        chatRoomMemberRepository.save(chatRoomMember_2);
    }

    // app/chat/send를 통해서 메시지를 발송하면
    // sendChatMessage로 메세지가 넘어와 저장하게 된다.
    public void sendChatMessage(ChatMessage chatMessage) {
        // 채팅 쓴 사람의 이름을 찾기
        Member member = chatMessage.getMemberId();
        String memberName = member.getName();
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)){
            chatMessage.setMessage(memberName + "님이 방에 입장했습니다.");
        } else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
            chatMessage.setMessage(memberName + "님이 방에서 나갔습니다.");
        }
        chatMessageRepository.save(chatMessage);
    }

    public ChatMessage getLastMessage(ChatRoom roomId) {
        List<ChatMessage> chatList = chatMessageRepository.findByRoomIdOrderByCreatedAtDesc(roomId);
        return chatList.get(0);
    }

    //****************************[READ]*********************************//
    // 로그인한 채팅방 목록
    public List<ChatRoomResponse> findChatRoomList(Long memberId) {
        // 1. 멤버 id 값으로 부터 멤버 객체를 찾기
        Member loginMember = memberRepository.findById(memberId).orElseThrow(() -> new ApiException(ServiceErrorType.NOT_FOUND));
        // 2. 멤버 객체로부터 chatRoomMember 리스트를 찾기
        List<ChatRoomMember> chatRoomMemberList = chatRoomMemberRepository.findChatRoomMembersByMemberId(loginMember);
        List<ChatRoomMember> chatRoomMemberListAnother = new ArrayList<>();
        for(ChatRoomMember chatRoomMember: chatRoomMemberList){
            chatRoomMemberListAnother.addAll(chatRoomMemberRepository.findChatRoomMembersByChatRoomId(chatRoomMember.getChatRoomId()));
        }
        // 3. 채팅방 정보를 넣기
        // 로그인한 사람의 memberId와 같은 건 builder에 넣지 않는다. -> response 다시

        return chatRoomMemberListAnother.stream().filter(chatRoomMember -> !Objects.equals(chatRoomMember.getMemberId().getId(), memberId))
                .sorted(Comparator.comparing(chatRoomMember -> getLastMessage(chatRoomMember.getChatRoomId()).getCreatedAt(), Comparator.reverseOrder()))
                .map(chatRoomMember -> ChatRoomResponse.builder()
                        .id(chatRoomMember.getChatRoomId().getId())
                        .lastMessageId(getLastMessage(chatRoomMember.getChatRoomId()))
                        .guestMember(chatRoomMember.getMemberId())
                        .build()).collect(Collectors.toList());
    }

    // 채팅방 datail 가져오기
    public ChatRoomDetailResponse getChatRoomDetail(Long chatRoomId, Long loginMemberId, Long guestMemberId) {
        // 0. response
        ChatRoomDetailResponse chatRoomDetailResponse = new ChatRoomDetailResponse();
        // 1. 로그인 멤버 id 값으로부터 로그인 멤버 객체를 찾고 response에 넣기
        Member loginMember = memberRepository.findById(loginMemberId).orElseThrow(() -> new ApiException(ServiceErrorType.NOT_FOUND));
        chatRoomDetailResponse.setLoginMember(loginMember);
        // 2. 게스트 멤버 id 값으로부터 게스트 멤버 객체를 찾고 response에 넣기
        Member guestMember = memberRepository.findById(guestMemberId).orElseThrow(() -> new ApiException(ServiceErrorType.NOT_FOUND));
        chatRoomDetailResponse.setGuestMember(guestMember);
        // 3. 채팅방 id로부터 채팅방 객체 찾아서 id와 채팅리스트 채우기
        chatRoomDetailResponse.setId(chatRoomRepository.findChatRoomById(chatRoomId).getId());
        List<ChatMessage> sortedChatList = chatRoomRepository.findChatRoomById(chatRoomId)
                .getChatList()
                .stream()
                .sorted(Comparator.comparing(ChatMessage::getCreatedAt))
                .collect(Collectors.toList());

        chatRoomDetailResponse.setChatMessageList(sortedChatList);
        return chatRoomDetailResponse;
    }
}
