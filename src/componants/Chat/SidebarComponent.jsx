import React from "react";

const SidebarComponent = ({
  conversations,
  currentConversation,
  handleConversationClick,
  setShowPopup,
  getConversationName,
}) => {
  return (
    <aside className="w-full sm:w-80 border-r border-gray-300 flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((convo) => (
          <div
            key={convo._id}
            onClick={() => handleConversationClick(convo._id)}
            className={`flex items-center p-4 border-b border-gray-300 cursor-pointer ${
              currentConversation && currentConversation._id === convo._id
                ? "bg-blue-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <img
              src="avatar.png"
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-semibold text-gray-800">
                {getConversationName(convo)}
              </div>
              <div className="text-sm text-gray-600">
                {convo.lastMessage ? convo.lastMessage.content : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarComponent;
