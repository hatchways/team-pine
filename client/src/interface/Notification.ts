export default interface Notification {
  sender: string;
  receiver: string;
  type: string;
  title: string;
  description: string;
  read: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
