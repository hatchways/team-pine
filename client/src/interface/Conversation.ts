interface User {
  email: string;
  name: string;
  _id: string;
}

export interface MessageInterface {
  sender: User;
  description: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default interface Conversation {
  user: string;
  messages: [MessageInterface];
  participants: [User, User];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
