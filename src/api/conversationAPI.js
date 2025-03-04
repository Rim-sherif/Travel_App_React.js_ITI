
export async function fetchConversationsAPI(token) {

    const API_URL_conversation = "http://localhost:5000/api/v1/conversations/?select=participants.email,participants.name,participants.role,participants.lastSeen,lastMessage,participants._id,participants.image&page=1&size=10&sort=lastMessage.createdAt:desc";

  const response = await fetch(API_URL_conversation, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
  
   const conversations = await response.json();
console.log(conversations);

   return conversations
}





