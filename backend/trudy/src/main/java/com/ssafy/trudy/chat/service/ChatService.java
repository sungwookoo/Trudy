package com.ssafy.trudy.chat.service;

import com.ssafy.trudy.chat.model.ChatMessage;
import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.model.ChatRoomMember;
import com.ssafy.trudy.chat.repository.ChatRoomMemberRepository;
import com.ssafy.trudy.chat.repository.ChatRoomRepository;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomMemberRepository chatRoomMembersRepository;
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
        chatRoomMembersRepository.save(chatRoomMember_1);
        chatRoomMembersRepository.save(chatRoomMember_2);
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
//    public void setUserEnterInfo(String sessionId, String roomId) {
//        ChatRoomMember chatRoomMembers = new ChatRoomMember();
//        // 세션 아이디도 챗 룸 중간엔티티에 저장
//        chatRoomMembers.setSessionId(sessionId);
//        // 룸 아이디를 저장하기 위해서 우선, roomId로부터 해당 룸을 찾는다.
//        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(Long.parseLong(roomId));
//        chatRoomMembers.setChatRoomId(chatRoom);
//        // 유저 세션과 채팅방 ID로부터 매핑된 채팅방을 저장한다.
//        chatRoomMembersRepository.save(chatRoomMembers);
//    }

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

//    // 특정 채팅방 조회(채팅방 이름으로 검색)
//    public List<ChatRoom> findRoomsByKeyword(String keyword){
//        return chatRoomRepository.findChatRoomsByNameContaining(keyword);
//    }

    // 특정 채팅방 조회(클릭시 방ID로)
    public ChatRoom findChatRoomById(String roomIdStr) {
        Long roomId = Long.parseLong(roomIdStr);
        return chatRoomRepository.findChatRoomById(roomId);
    }

//    // 채팅방 유저수 조회
//    public Long getUserCount(Long roomId) {
//        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
//        return chatRoom.getUserCount();
//    }

    // 유저 세션으로 입장해 있는 채팅방 ID 조회
//    public List<String> getUserEnterRoomId(String sessionId) {
//        List<ChatRoomMember> chatRoomMembersList = chatRoomMembersRepository.findChatRoomMembersBySessionId(sessionId);
//        List<String> roomIdList = new ArrayList<>();
//        for(ChatRoomMember chatRoomMembers : chatRoomMembersList) {
//            Long longId = chatRoomMembers.getChatRoomId().getId();
//            String longIdStr = longId.toString();
//            roomIdList.add(longIdStr);
//        }
//        return roomIdList;
//    }

    //****************************[UPDATE]*******************************//
//    // 유저 입장시 숫자 하나를 늘린다.
//    public Long plusUserCount(String roomIdStr) {
//        // roomId로부터 해당 room 객체를 찾는다.
//        Long roomId = Long.parseLong(roomIdStr);
//        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
//        Long userCount = chatRoom.getUserCount();
//        userCount += 1;
//        chatRoom.setUserCount(userCount);
//        return userCount;
//    }

    // 유저 퇴장시 숫자 하나를 줄인다.
//    public Long minusUserCount(String roomIdStr) {
//        // roomId로부터 해당 room 객체를 찾는다.
//        Long roomId = Long.parseLong(roomIdStr);
//        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
//        Long userCount = chatRoom.getUserCount();
//        userCount += 1;
//        chatRoom.setUserCount(userCount);
//        return userCount;
//    }

    //****************************[DELETE]*******************************//
//    // 유저 세션정보와 맵핑된 채팅방 ID 삭제
//    public void removeUserEnterInfo(String sessionId, String roomIdStr) {
//        Long roomId = Long.parseLong(roomIdStr);
//        ChatRoom chatRoom = chatRoomRepository.findChatRoomById(roomId);
//        ChatRoomMember chatRoomMembers = chatRoomMembersRepository.findChatRoomMembersBySessionIdAndChatRoomId(sessionId, chatRoom);
//        chatRoomMembersRepository.delete(chatRoomMembers);
//    }
}
