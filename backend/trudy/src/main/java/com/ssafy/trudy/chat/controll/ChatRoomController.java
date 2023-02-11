package com.ssafy.trudy.chat.controller;

import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.service.ChatService;
import com.ssafy.trudy.member.model.Member;
import com.ssafy.trudy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Websocket 통신 외에 채팅 화면 View 구성을 위해 필요한 Controller

// View 구성을 위한 Controller
@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatService chatService;
    private final MemberService memberService;

    //************************************[CREATE]***********************************//
    // 1. 개인 DM을 위한 방 생성(roomMakerId - 채팅시작한 사람, guestId - 해당 프로필 계정의 Id)
    @PostMapping("/personal") // 개인 DM방 생성
    public void createPersonalChatRoom(@RequestParam Long roomMakerId, @RequestParam Long guestId) {
        Member roomMaker = memberService.getById(roomMakerId);
        Member guest = memberService.getById(guestId);
        // 채팅방이 하나 생성되고 채팅방-멤버 중개테이블이 추가
        chatService.createChatRoom(roomMaker, guest);
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }

    //************************************[READ]*************************************//





    //************************************[UPDATE]***********************************//




    //************************************[DELETE]***********************************//
    // 채팅 첫 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }
    // 모든 채팅방 목록 반환
//    @GetMapping("/rooms")
//    @ResponseBody
//    public List<ChatRoom> room() {
//        List<ChatRoom> chatRooms = chatService.findAllRoom();
//        chatRooms.stream().forEach(room -> room.setUserCount(chatService.getUserCount(room.getId())));
//        return chatRooms;
//    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findChatRoomById(roomId);
    }
}
