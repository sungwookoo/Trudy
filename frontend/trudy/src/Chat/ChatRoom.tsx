import React, { useEffect, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';

interface UserData {
  username: string;
  receivername: string;
  connected: boolean;
  message: string
}

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message?: string;
  status: string;
}

let stompClient:any = null;

function ChatRoom() {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(new Map());
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    username: '',
    receivername: '',
    connected:false,
    message: ''
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({...userData, connected:true});
    stompClient.subscribe('/chatroom/public', onMessageRecieved);
    stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessage);
    userJoin();
  }

  const userJoin = () => {
    const chatMessage: ChatMessage = {
      senderName: userData.username,
      status:"JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  }

  const onMessageRecieved = (payload: { body:string }): void => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    switch(payloadData.status){
      case "JOIN":
        if(!privateChats.get(payloadData.senderName)){
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default:
        break;
    }
  }

  const onPrivateMessage = (payload: { body: string }): void => {
    console.log(payload);
    const payloadData: ChatMessage = JSON.parse(payload.body);
    if(privateChats.get(payloadData.senderName)){
      privateChats.get(payloadData.senderName)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName,list);
      setPrivateChats(new Map(privateChats));
    }
  }

  const onError = (error:any) => {
    console.log(error)
  }

  const handleMessage = (event:any) => {
    const {value}=event.target;
    setUserData({...userData,message: value});
  }

  const sendValue = () => {
    if(stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status:"MESSAGE"
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({...userData,message: ""});
    }
  }

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        recieverName: tab,
        message: userData.message,
        status:"MESSAGE"
      };

      if(userData.username !== tab) {
        privateChats.get(tab)!.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({...userData,message:""});
    }
  }

  const handleUsername = (event:any) => {
    const {value} = event.target;
    setUserData({...userData,username: value});
  }

  const registerUser = () => {
    connect();
  }

  return (
    <div className="chat-container">
      {userData.connected?
      <div className="chat-box">
        <div className="chat-member-list">
          <ul>
            <li onClick={()=>{setTab("CHATROOM")}} className={`chat-member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
            {[...privateChats.keys()].map((name,index)=>(
              <li onClick={()=>{setTab(name)}} className={`chat-member ${tab===name && "active"}`} key={index}>{name}</li>
            ))}
          </ul>
        </div>
        {tab==="CHATROOM" && <div className="chat-content">
          <ul className="chat-messages">
            {publicChats.map((chat,index)=>(
              <li className={`chat-message ${chat.senderName === userData.username && "self"}`} key={index}>
                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                <div className="chat-message-data">{chat.message}</div>
                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
              </li>
            ))}
          </ul>

          <div className="chat-send-message">
            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
            <button type="button" className="chat-send-button" onClick={sendValue}>send</button>
          </div>
        </div>}
        {tab!=="CHATROOM" && <div className="chat-content">
          <ul className="chat-message">
            {[...privateChats.get(tab)!].map((chat,index)=>(
              <li className={`chat-message ${chat.senderName === userData.username && "self"}`} key={index}>
                {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                <div className="message-data">{chat.message}</div>
                {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
              </li>
            ))}
          </ul>

          <div className="chat-send-message">
            <input type="text" className="chat-input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
            <button type="button" className="chat-send-button" onClick={sendPrivateValue}>send</button>
          </div>
        </div>}
      </div>
      :
      // 접속아닌 경우 익명의 이름을 등록
      <div className="chat-register">
        <input
          id="user-name"
          placeholder="Enter your name"
          name="userName"
          value={userData.username}
          onChange={handleUsername}
        />
        <button type="button" onClick={registerUser}>
          connect
        </button> 
      </div>}
    </div>
  )
}

export default ChatRoom