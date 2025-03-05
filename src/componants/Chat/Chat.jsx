// ChatPage.jsx
import React, { useState, useEffect, useRef } from "react";
import SidebarComponent from "./SidebarComponent";
import ChatComponent from "./ChatComponent";
import TopBarComponent from "./TopBarComponent";
import { CreateConversation, fetchConversationsAPI } from "../../api/conversationAPI";
import { fetchUsers } from "../../api/searchUser";
import { fetchMessagesAPI } from "../../api/messagesAPI.js";
import { io } from "socket.io-client";

const currentUserId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const currentUserAvatar = localStorage.getItem("avatar") || "avatar.png";

const ensureMessages = (convo) => {
  return { ...convo, messages: convo.messages || [] };
};

const transformMessage = (message) => {
  let senderUser;
  if (Array.isArray(message.sender)) {
    senderUser = message.sender[0];
  } else if (typeof message.sender === "object") {
    senderUser = message.sender;
  } else {
    senderUser = { _id: message.sender, image: "avatar.png" };
  }
  return {
    sender: senderUser._id === currentUserId ? "me" : "other",
    text: message.content,
    time: new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    avatar: senderUser.image || "avatar.png",
  };
};

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      path: "/socket.io/",
    });
    socketRef.current.on("connect", () => {
      socketRef.current.emit("login", token);
    });

    socketRef.current.on("receive_message", (message) => {
      const transformed = transformMessage(message);
      setConversations((prevConvos) => {
        const updated = prevConvos.map((convo) => {
          if (convo._id === message.conversationId) {
            return {
              ...convo,
              messages: [...(convo.messages || []), transformed],
              lastMessage: message,
            };
          }
          return convo;
        });
        setCurrentConversation((prev) => {
          if (!prev) {
            return updated.find((c) => c._id === message.conversationId) || prev;
          }
          return prev;
        });
        return updated;
      });
      setCurrentConversation((prev) => {
        if (prev && prev._id === message.conversationId) {
          return { ...prev, messages: [...prev.messages, transformed] };
        }
        return prev;
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await fetchConversationsAPI(token);
        setConversations(data.conversations);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  const fetchMessagesForConversation = async (conversationId) => {
    try {
      const response = await fetchMessagesAPI(token, conversationId);
      return response.data.map(transformMessage);
    } catch (error) {
      console.error("Error fetching messages for conversation", conversationId, error);
      return [];
    }
  };

  useEffect(() => {
    if (conversations.length > 0 && !currentConversation) {
      (async () => {
        const firstConvo = ensureMessages(conversations[0]);
        firstConvo.messages = await fetchMessagesForConversation(firstConvo._id);
        setCurrentConversation(firstConvo);
      })();
    }
  }, [conversations, currentConversation]);

  const handleConversationClick = async (_id) => {
    let convo = conversations.find((c) => c._id === _id);
    convo = ensureMessages(convo);
    convo.messages = await fetchMessagesForConversation(_id);
    setCurrentConversation(convo);
  };

  const handleSendMessage = () => {
    if (messageInput && currentConversation) {
      const newMsg = {
        sender: "me",
        text: messageInput,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: currentUserAvatar,
      };

      if (socketRef.current) {
        const receiverId = getConversation(currentConversation)._id;
        socketRef.current.emit("send_message", { receiverId, content: messageInput });
      }

      const updatedConvo = {
        ...currentConversation,
        messages: [...(currentConversation.messages || []), newMsg],
        lastMessage: {
          content: messageInput,
          createdAt: new Date().toISOString(),
          sender: { _id: currentUserId },
        },
      };
      setCurrentConversation(updatedConvo);
      setConversations((prev) =>
        prev.map((c) => (c._id === updatedConvo._id ? updatedConvo : c))
      );
      setMessageInput("");
    }
  };

  const fetchMatchingUsers = async () => {
    if (searchUser) {
      try {
        const data = await fetchUsers(token, searchUser);
        setSearchResults(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchButtonClick = () => {
    fetchMatchingUsers();
  };

  const handleSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleStartConversation = async (user) => {
    if (user) {
      try {
        const newConvo = await CreateConversation(user._id, token);
        newConvo.messages = [];
        const exists = conversations.find((econvo) => econvo._id === newConvo._id);
        if (exists) {
          setCurrentConversation(exists);
        } else {
          setConversations((prev) => [newConvo, ...prev]);
          setCurrentConversation(newConvo);
        }
        setShowPopup(false);
        setSearchUser("");
        setSearchResults([]);
      } catch (error) {
        console.error("Error creating conversation:", error);
      }
    } else {
      alert("Please select or type a user name first!");
    }
  };

  const getConversation = (convo) => {
    if (!convo?.participants || convo.participants.length < 2) return {};
    return convo.participants[0]._id === currentUserId ? convo.participants[1] : convo.participants[0];
  };

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-white text-gray-900 transition-colors duration-300">
      <TopBarComponent />
      <div className="flex flex-1 overflow-hidden">
        <SidebarComponent
          conversations={conversations}
          currentConversation={currentConversation}
          handleConversationClick={handleConversationClick}
          setShowPopup={setShowPopup}
          getConversation={getConversation}
        />
        <ChatComponent
          currentConversation={currentConversation}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
          getConversation={getConversation}
        />
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <h3 className="text-lg">Start New Conversation</h3>
              <button onClick={() => setShowPopup(false)} className="text-xl">
                &times;
              </button>
            </div>
            <div className="p-4">
              <label className="block mb-2 text-sm">Search for a user:</label>
              <div className="flex">
                <input
                  type="text"
                  value={searchUser}
                  onChange={handleSearchChange}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Type a user name..."
                />
                <button
                  onClick={handleSearchButtonClick}
                  className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
              <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md">
                {searchResults?.map((user) => (
                  <li
                    key={user?._id}
                    onClick={() => {
                      setSearchUser(user.name);
                      handleStartConversation(user);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                  >
                    <img src={user.image || "avatar.png"} alt={user.name} className="w-8 h-8 rounded-full" />
                    <div className="ml-2">
                      <h2 className="font-semibold">{user.name}</h2>
                      <p className="text-xs text-gray-600">{user.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-300">
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
