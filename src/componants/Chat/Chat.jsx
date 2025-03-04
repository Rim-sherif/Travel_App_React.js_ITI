import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import ChatComponent from "./ChatComponent";
import TopBarComponent from "./TopBarComponent";
import { fetchConversationsAPI } from "../../api/conversationAPI";
import { fetchUsers } from "../../api/searchUser";

const currentUserEmail = "sender@gmail.com";

function ensureMessages(convo) {
  if (!convo.messages) {
    convo.messages = [
      {
        sender:
          convo.lastMessage.sender.email === currentUserEmail ? "me" : "other",
        text: convo.lastMessage.content,
        time: new Date(convo.lastMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "avatar.png",
      },
    ];
  }
  return convo;
}

const ChatPage = () => {
  const [conversations, setConversations] = useState([]); // Initialize with an empty array
  const [currentConversation, setCurrentConversation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch conversations from the API
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchConversationsAPI(token);
        setConversations(data.conversations); // Update state with fetched conversations
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchConversations();
  }, []);

  // Function to fetch matching users
  const fetchMatchingUsers = async () => {
    if (searchUser) {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchUsers(token, searchUser); // Pass the search input to the API
        setSearchResults(data.users); // Update search results with fetched users
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    } else {
      setSearchResults([]); // Clear search results if search input is empty
    }
  };

  // Fetch users based on search input when the button is clicked
  const handleSearchButtonClick = () => {
    fetchMatchingUsers();
  };

  useEffect(() => {
    if (conversations.length > 0 && !currentConversation) {
      setCurrentConversation(ensureMessages(conversations[0]));
    }
  }, [conversations, currentConversation]);

  const handleConversationClick = (_id) => {
    let convo = conversations.find((c) => c._id === _id);
    setCurrentConversation(ensureMessages(convo));
  };

  const handleSendMessage = () => {
    if (messageInput && currentConversation) {
      const newMsg = {
        sender: "me",
        text: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "avatar.png",
      };
      const updatedConvo = {
        ...currentConversation,
        messages: [...currentConversation.messages, newMsg],
        lastMessage: {
          content: messageInput,
          createdAt: new Date().toISOString(),
          sender: { email: currentUserEmail },
        },
      };
      console.log("Sending message:", newMsg);
      setCurrentConversation(updatedConvo);
      setConversations(
        conversations.map((c) =>
          c._id === updatedConvo._id ? updatedConvo : c
        )
      );
      setMessageInput("");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log("Search input changed:", value);
    setSearchUser(value); // Update search input state
  };

  const handleStartConversation = () => {
    if (searchUser) {
      let existing = conversations.find(
        (c) =>
          c.participants
            .find((p) => p.email.toLowerCase() !== currentUserEmail)
            ?.name.toLowerCase() === searchUser.toLowerCase()
      );
      if (existing) {
        console.log("Starting existing conversation:", existing);
        setCurrentConversation(ensureMessages(existing));
      } else {
        // Create new conversation with currentUser and the searched user
        const newConvo = {
          _id: Date.now().toString(),
          lastMessage: null,
          participants: [
            {
              _id: "currentUser",
              name: "sender",
              email: currentUserEmail,
              role: "User",
            },
            {
              _id: Date.now().toString(),
              name: searchUser,
              email: "", // unknown for now
              role: "User",
            },
          ],
          messages: [],
        };
        console.log("Creating new conversation:", newConvo);
        setConversations([...conversations, newConvo]);
        setCurrentConversation(newConvo);
      }
      setShowPopup(false);
      setSearchUser("");
      setSearchResults([]);
    } else {
      alert("Please select or type a user name first!");
    }
  };

  const getConversationName = (convo) => {
    const other = convo.participants.find((p) => p.email !== currentUserEmail);
    return other ? other.name : convo.participants[0].name;
  };

  if (loading) {
    return <div>Loading conversations...</div>; // Show a loading message while fetching data
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
          getConversationName={getConversationName}
        />
        <ChatComponent
          currentConversation={currentConversation}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
          getConversationName={getConversationName}
        />
      </div>
      {/* Popup for New Conversation */}
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
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSearchUser(user.name); // Set the selected user as the search input
                      setSearchResults([]); // Clear the search results
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-300">
              <button
                onClick={handleStartConversation}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Start Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
