interface User {
  email: string;
  name: string;
  _id: string;
}

export interface Message {
  sender: User;
  receiver: string;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default interface Conversation {
  user: string;
  messages: [Message];
  participants: [User, User];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
