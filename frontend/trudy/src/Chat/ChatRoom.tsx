import React, { useContext, useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./ChatRoom.css";
import AuthContext from "../Common/authContext";
import axios from "axios";

interface UserData {
  username: string;
  receivername: string;
  connected: boolean;
  message: string;
}

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message?: string;
  status: string;
}
let stompClient: any = null;

function ChatRoom() {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(
    new Map()
  );
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>("CHATROOM");
  const [userData, setUserData] = useState<UserData>({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const [tempMessage, setTempMessage] = useState<any>(null);
  const authCtx = useContext(AuthContext);
  const userInfo = authCtx.loggedInfo;
  const myInfoUrl = "api/member/me";
  const token = "bearer " + localStorage.getItem("token");

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  useEffect(() => {
    (async () => {
      try {
        const myInfoResponse = await axios.get(myInfoUrl, {
          headers: {
            Authorization: token,
          },
        });
        setUserData({ ...userData, username: myInfoResponse.data.name });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const connect = () => {
    const Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageRecieved);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    const chatMessage: ChatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageRecieved = (payload: { body: string }): void => {
    const payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
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
  };

  const onPrivateMessage = (payload: { body: string }): void => {
    // console.log(payload);
    const payloadData: ChatMessage = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)!.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      const list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (error: any) => {
    console.log(error);
  };

  const handleMessage = (event: any) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
    setTempMessage(event.target);
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const { value } = tempMessage;
      setUserData({ ...userData, message: value });
      setTempMessage(null);
      sendValue();
    }
  };

  const pressEnterPrivate = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const { value } = tempMessage;
      setUserData({ ...userData, message: value });
      setTempMessage(null);
      sendPrivateValue();
    }
  };

  const sendValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      // console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        recieverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab)!.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div id="container">
      {userData.connected ? (
        <div id="chat-box">
          <div className="member-list">
            <ul>
              <li
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                With All Trudy!
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul id="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div id="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyDown={pressEnter}
                />
                <button type="button" id="send-button" onClick={sendValue}>
                  Send
                </button>
              </div>
            </div>
          )}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul id="chat-messages">
                {[...privateChats.get(tab)!].map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
              </ul>

              <div id="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyDown={pressEnterPrivate}
                />
                <button
                  type="button"
                  id="send-button"
                  onClick={sendPrivateValue}
                >
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Trudy 입장화면
        <div className="register">
          <div id="chat-title">Trudy Talk & Talk</div>
          <div id="introduce-chat">
            <ul>
              <li id="">Here, you can talk with all Trudy!</li>
              <li id="">I want you to find real good friends!</li>
              <li id="">Have great time with TRUDY!</li>
            </ul>
          </div>
          <button id="go-button" type="button" onClick={registerUser}>
            Let's Go!
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
