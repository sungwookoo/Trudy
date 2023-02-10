package com.ssafy.trudy.chat.controller;

import com.ssafy.trudy.chat.model.ChatRoom;
import com.ssafy.trudy.chat.service.ChatService;
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

    //************************************[CREATE]***********************************//


    //************************************[READ]*************************************//





    //************************************[UPDATE]***********************************//




    //************************************[DELETE]***********************************//
    // 채팅 첫 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }
    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        List<ChatRoom> chatRooms = chatService.findAllRoom();
        chatRooms.stream().forEach(room -> room.setUserCount(chatService.getUserCount(room.getId())));
        return chatRooms;
    }
    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        return chatService.createChatRoom(name);
    }
    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findChatRoomById(roomId);
    }
}
