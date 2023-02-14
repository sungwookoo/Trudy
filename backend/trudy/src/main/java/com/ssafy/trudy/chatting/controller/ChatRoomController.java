package com.ssafy.trudy.chatting.controller;

import com.ssafy.trudy.chatting.model.response.ChatRoomDetailResponse;
import com.ssafy.trudy.chatting.model.response.ChatRoomResponse;
import com.ssafy.trudy.chatting.service.ChatService;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Websocket 통신 외에 채팅 화면 View 구성을 위해 필요한 Controller
// View 구성을 위한 Controller
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/")
public class ChatRoomController {

    private final ChatService chatService;
    private final MemberService memberService;

    //************************************[CREATE]***********************************//
    // 1. 개인 DM을 위한 방 생성(roomMakerId - 채팅시작한 사람, guestId - 해당 프로필 계정의 Id)
    @PostMapping("/chat/room") // 개인 DM방 생성
    public void createPersonalChatRoom(@RequestParam Long roomMakerId, @RequestParam Long guestId) {
        Member roomMaker = memberService.getById(roomMakerId);
        Member guest = memberService.getById(guestId);
        // 채팅방이 하나 생성되고 채팅방-멤버 중개테이블이 추가
        chatService.createChatRoom(roomMaker, guest);
    }

    //************************************[READ]*************************************//
    // 1. 로그인한 유저의 채팅 리스트를 가져오기 -> clear
    @GetMapping("/chat/room")
    public List<ChatRoomResponse> findChatRoomList(@RequestParam Long memberId) {
        log.info(memberId.toString());
        return chatService.findChatRoomList(memberId);
    }


    // 2. 채팅리스트에서 특정 채팅창을 눌렀을 때, 디테일 정보 가져오기
    @GetMapping("/chat/room/detail")
    public ChatRoomDetailResponse getChatRoomDetail(@RequestParam Long chatRoomId,
                                                    @RequestParam Long loginMemberId,
                                                    @RequestParam Long guestId) {
        return chatService.getChatRoomDetail(chatRoomId, loginMemberId, guestId);
    }
    //************************************[DELETE]***********************************//
}
