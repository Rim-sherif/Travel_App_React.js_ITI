// Dummy data simulating API responses
const dummyConversations = [
    {
      id: 1,
      name: "John Doe",
      avatar: "avatar.png",
      lastMessage: "Hey, how are you?",
      messages: [
        { sender: "me", text: "Hello, how are you?", time: "10:20 AM", avatar: "avatar.png" },
        { sender: "other", text: "I'm good, thanks!", time: "10:22 AM", avatar: "avatar.png" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "avatar.png",
      lastMessage: "See you later",
      messages: [
        { sender: "me", text: "Hi Jane", time: "9:00 AM", avatar: "avatar.png" },
        { sender: "other", text: "Bye!", time: "9:05 AM", avatar: "avatar.png" }
      ]
    }
  ];
  
  const dummyUsers = [
    { id: 3, name: "Alice Johnson", avatar: "avatar.png" },
    { id: 4, name: "Bob Williams", avatar: "avatar.png" },
    { id: 5, name: "Charlie Brown", avatar: "avatar.png" }
  ];
  
  let conversations = dummyConversations.slice();
  let currentConversation = null;
  
  function loadConversations() {
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = "";
    conversations.forEach(convo => {
      const convoItem = document.createElement('div');
      convoItem.className = 'conversation-item';
      convoItem.dataset.id = convo.id;
      convoItem.innerHTML = `
        <img src="${convo.avatar}" alt="User" class="conversation-avatar">
        <div class="conversation-info">
          <span class="conversation-name">${convo.name}</span>
          <span class="last-message">${convo.lastMessage}</span>
        </div>
      `;
      convoItem.addEventListener('click', () => {
        setActiveConversation(convo.id);
      });
      conversationList.appendChild(convoItem);
    });
  }
  
  function setActiveConversation(convoId) {
    currentConversation = conversations.find(c => c.id == convoId);
    updateActiveConversationUI();
    loadMessages();
  }
  
  function updateActiveConversationUI() {
    const items = document.querySelectorAll('.conversation-item');
    items.forEach(item => {
      if(item.dataset.id == currentConversation.id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    const chatHeader = document.getElementById('chatHeader');
    chatHeader.innerHTML = `
      <img src="${currentConversation.avatar}" alt="User" class="chat-header-avatar">
      <h3>${currentConversation.name}</h3>
    `;
  }
  
  function loadMessages() {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = "";
    currentConversation.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${msg.sender === 'me' ? 'from-me' : 'from-other'}`;
      messageDiv.innerHTML = `
        <img src="${msg.avatar}" alt="${msg.sender}" class="message-avatar">
        <div class="message-content">
          <p>${msg.text}</p>
          <span class="time">${msg.time}</span>
        </div>
      `;
      messageContainer.appendChild(messageDiv);
    });
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
  
  function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const text = chatInput.value.trim();
    if(text && currentConversation) {
      const newMsg = {
        sender: 'me',
        text: text,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        avatar: "avatar.png"
      };
      currentConversation.messages.push(newMsg);
      currentConversation.lastMessage = text;
      loadMessages();
      loadConversations();
      chatInput.value = "";
    }
  }
  
  const newChatBtn = document.getElementById('newChatBtn');
  const popupOverlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const searchUser = document.getElementById('searchUser');
  const searchResults = document.getElementById('searchResults');
  const startChatBtn = document.getElementById('startChatBtn');
  
  newChatBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
  });
  
  closeBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });
  
  const allUsers = dummyUsers;
  
  searchUser.addEventListener('input', () => {
    const query = searchUser.value.trim().toLowerCase();
    const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(query));
    searchResults.innerHTML = "";
    filteredUsers.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.name;
      li.dataset.id = user.id;
      li.addEventListener('click', () => {
        searchUser.value = user.name;
        searchResults.innerHTML = "";
      });
      searchResults.appendChild(li);
    });
  });
  
  startChatBtn.addEventListener('click', () => {
    const userName = searchUser.value.trim();
    if(userName) {
      let existing = conversations.find(c => c.name.toLowerCase() === userName.toLowerCase());
      if(existing) {
        setActiveConversation(existing.id);
      } else {
        const newConvo = {
          id: Date.now(),
          name: userName,
          avatar: "avatar.png",
          lastMessage: "",
          messages: []
        };
        conversations.push(newConvo);
        setActiveConversation(newConvo.id);
      }
      popupOverlay.style.display = 'none';
      searchUser.value = "";
      searchResults.innerHTML = "";
      loadConversations();
    } else {
      alert('Please select a user or type a name first!');
    }
  });
  
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('chatInput').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
      sendMessage();
    }
  });
  
  function initializeChat() {
    setTimeout(() => {
      loadConversations();
      if(conversations.length > 0) {
        setActiveConversation(conversations[0].id);
      }
    }, 500);
  }
  
  initializeChat();
  