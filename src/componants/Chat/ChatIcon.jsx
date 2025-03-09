import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imgIcon from '/chat.png'
const ChatIcon = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/Chat') {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 cursor-pointer"
      onClick={() => navigate('/Chat')}
    >
      <img
        src={imgIcon}
        alt="Chat Icon"
        className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition transform duration-200"
      />
    </div>
  );
};

export default ChatIcon;
