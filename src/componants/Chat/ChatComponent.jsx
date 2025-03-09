// ChatComponent.jsx
import React, { useRef, useEffect } from "react";

const ChatComponent = ({
  currentConversation,
  messageInput,
  setMessageInput,
  handleSendMessage,
  getConversation,
}) => {
  const messages = currentConversation?.messages || [];
  const messagesEndRef = useRef(null);

  // تمرير الأسفل تلقائياً عند وصول رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* رأس المحادثة */}
      <div className="flex items-center p-4 bg-gray-50 border-b border-gray-300">
        {currentConversation && (
          <>
            <img
              src={getConversation(currentConversation).image || defultImg}
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {getConversation(currentConversation).name}
            </h3>
          </>
        )}
      </div>
      {/* عرض الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
              <img src={msg.avatar || defultImg} alt="Avatar" className="w-8 h-8 rounded-full mx-2" />
              <div className={`p-2 rounded-lg ${msg.sender === "me" ? "bg-blue-50" : "bg-gray-200"}`}>
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-600">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* إدخال الرسالة */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChatComponent;
