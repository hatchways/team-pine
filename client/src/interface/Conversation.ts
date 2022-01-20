export interface Message {
  sender: string;
  receiver: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  email: string;
  name: string;
}

export default interface Conversation {
  user: string;
  messages: [Message];
  participants: [User, User];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
