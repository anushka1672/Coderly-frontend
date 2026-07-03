import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useRef } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const socketRef = useRef(null);
  const connections = useSelector((store) => store.connection);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const { targetId } = useParams();
  console.log(targetId);

  const user = useSelector((state) => state.user);
  const userId = user?._id;

  useEffect(() => {
    // socket connection establish.
    socketRef.current = createSocketConnection();

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!userId || !targetId) return;

    const connection = connections.find((el) => {
      if (el.toUserId === targetId || el.fromUserId === targetId) {
        return el;
      }
    });
    console.log(connection);
    const toUserName =
      connection.fromUserId === targetId
        ? connection.fromUserName
        : connection.toUserName;

    const socket = socketRef.current;

    socket.emit("joinChat", {
      userName: user.firstName,
      userId,
      targetId,
      toUserName,
    });

    const handleReceive = ({ userName, text, senderId }) => {
      setMessages((prev) => [...prev, { text, userName ,senderId}]);
    };

    socket.on("messagesRecieved", handleReceive);

    return () => {
      socket.off("messagesRecieved", handleReceive);
    };
  }, [userId, targetId]);

  function handleMessage() {
    const socket = socketRef.current;
    socket.emit("sendMessages", {
      userName: user.firstName,
      userId,
      targetId,
      text: newMessages,
    });
    setNewMessages("");
  }

  async function fetchChatData() {
    const response = await axios.get(`${BASE_URL}/chat/${targetId}`, {
      withCredentials: true,
    });

    console.log(response.data.messages);
    const data = response.data.messages.map((el) => {
      return {
        senderId: el.senderId._id,
        userName: el.senderId.firstName,
        text: el.text,
        time: el.createdAt,
      };
    });

    setMessages(data);
  }

  useEffect(() => {
    fetchChatData();
  }, []);

 return (
  <div className="w-full h-screen bg-gray-950 flex justify-center items-center">
    <div className="w-[95%] max-w-2xl h-[650px] bg-gray-900 border border-gray-700 rounded-xl flex flex-col shadow-xl">

      {/* Header */}
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-2xl font-semibold text-white">Chat</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-950">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId;

          return (
            <div
              key={index}
              className={`flex mb-4 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-md ${
                  isMe
                    ? "bg-pink-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                <p className="text-xs opacity-70 mb-1">
                  {msg.userName}
                </p>

                <p className="text-base break-words">
                  {msg.text}
                </p>

                <p className="text-[11px] opacity-70 text-right mt-2">
                  {msg.time
                    ? new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4 flex items-center gap-3 bg-gray-900">
        <input
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-lg px-4 py-3 outline-none text-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMessage();
          }}
        />

        <button
          onClick={handleMessage}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
);
};

export default Chat;
