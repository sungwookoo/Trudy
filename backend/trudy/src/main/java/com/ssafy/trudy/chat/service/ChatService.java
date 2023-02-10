package com.ssafy.trudy.chat.service;

import com.ssafy.trudy.chat.model.ChatMessage;
import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.model.ChatRoomMembers;
import com.ssafy.trudy.chat.repository.ChatRoomMembersRepository;
import com.ssafy.trudy.chat.repository.ChatRoomRepository;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomMembersRepository chatRoomMembersRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    //****************************[CREATE]*******************************//
    // 채팅방 생성
    public ChatRoom createChatRoom(String name){
        // 채팅방 객체 생성
        ChatRoom chatRoom = ChatRoom.create(name);
        // 채팅방을 디비에 넣기
        chatRoomRepository.save(chatRoom);
        return chatRoom; //**DTO**만들어야함
    }
    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(ChatMessage chatMessage) {
        // 채팅 쓴 사람의 이름을 찾기
        Member member = chatMessage.getMemberId();
        String memberName = member.getName();
        if (chatMessage.getType().equals("ENTER")){
            chatMessage.setMessage(memberName + "님이 방에 입장했습니다.");
        } else if (chatMessage.getType().equals("QUIT")) {
            chatMessage.setMessage(memberName + "님이 방에서 나갔습니다.");
        }
    }

    // 유저가 입장한 채팅방 ID와 유저 세션ID 맵핑 정보 저장
    public void setUserEnterInfo(String sessionId, String roomId) {
        ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
        // 세션 아이디도 챗 룸 중간엔티티에 저장
        chatRoomMembers.setSessionId(sessionId);
        // 룸 아이디를 저장하기 위해서 우선, roomId로부터 해당 룸을 찾는다.
        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(Long.parseLong(roomId));
        chatRoomMembers.setChatRoomId(chatRoom);
        // 유저 세션과 채팅방 ID로부터 매핑된 채팅방을 저장한다.
        chatRoomMembersRepository.save(chatRoomMembers);
    }

    //****************************[READ]*********************************//

    /**
     * destination 정보에서 roomId 추출
     */
    public String getRoomId(String destination) {
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1)
            return destination.substring(lastIndex + 1);
        else
            return "";
    }

    // 전체 채팅방 조회
    public List<ChatRoom> findAllRoom(){
        return chatRoomRepository.findAllByOrderByCreatedAtDesc();
    }

    // 특정 채팅방 조회(채팅방 이름으로 검색)
    public List<ChatRoom> findRoomsByKeyword(String keyword){
        return chatRoomRepository.findChatRoomsByNameContaining(keyword);
    }

    // 특정 채팅방 조회(클릭시 방ID로)
    public ChatRoom findChatRoomById(String roomIdStr) {
        Long roomId = Long.parseLong(roomIdStr);
        return chatRoomRepository.findChatRoomById(roomId);
    }

    // 채팅방 유저수 조회
    public Long getUserCount(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
        return chatRoom.getUserCount();
    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
    public List<String> getUserEnterRoomId(String sessionId) {
        List<ChatRoomMembers> chatRoomMembersList = chatRoomMembersRepository.findChatRoomMembersBySessionId(sessionId);
        List<String> roomIdList = new ArrayList<>();
        for(ChatRoomMembers chatRoomMembers : chatRoomMembersList) {
            Long longId = chatRoomMembers.getChatRoomId().getId();
            String longIdStr = longId.toString();
            roomIdList.add(longIdStr);
        }
        return roomIdList;
    }

    //****************************[UPDATE]*******************************//
    // 유저 입장시 숫자 하나를 늘린다.
    public Long plusUserCount(String roomIdStr) {
        // roomId로부터 해당 room 객체를 찾는다.
        Long roomId = Long.parseLong(roomIdStr);
        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
        Long userCount = chatRoom.getUserCount();
        userCount += 1;
        chatRoom.setUserCount(userCount);
        return userCount;
    }

    // 유저 퇴장시 숫자 하나를 줄인다.
    public Long minusUserCount(String roomIdStr) {
        // roomId로부터 해당 room 객체를 찾는다.
        Long roomId = Long.parseLong(roomIdStr);
        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
        Long userCount = chatRoom.getUserCount();
        userCount += 1;
        chatRoom.setUserCount(userCount);
        return userCount;
    }

    //****************************[DELETE]*******************************//
    // 유저 세션정보와 맵핑된 채팅방 ID 삭제
    public void removeUserEnterInfo(String sessionId, String roomIdStr) {
        Long roomId = Long.parseLong(roomIdStr);
        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
        ChatRoomMembers chatRoomMembers = chatRoomMembersRepository.findChatRoomMembersBySessionIdAndChatRoomId(sessionId, chatRoom);
        chatRoomMembersRepository.delete(chatRoomMembers);
    }
}
