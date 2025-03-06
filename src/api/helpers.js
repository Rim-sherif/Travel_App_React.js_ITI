export function ensureMessages(convo, currentUserId) {
    if (!convo.messages) {
      convo.messages = convo.lastMessage ? [{
        sender: convo.lastMessage.sender._id === currentUserId ? "me" : "other",
        text: convo.lastMessage.content,
        time: new Date(convo.lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: convo.lastMessage.sender.image || "avatar.png"
      }] : [];
    }
    return convo;
  }