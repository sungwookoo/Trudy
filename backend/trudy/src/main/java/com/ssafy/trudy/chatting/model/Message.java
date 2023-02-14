package com.ssafy.trudy.chatting.model;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private String senderName;
    private String recieverName;
    private String message;
    private String date;
    private Status status;
}
