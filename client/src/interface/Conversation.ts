export interface Message {
  sender: string;
  receiver: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface userId {
  _id: string;
}

export default interface Conversation {
  user: string;
  messages: [Message];
  participants: [userId];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
