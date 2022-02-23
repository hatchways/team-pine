export default interface Review {
  _id: string;
  rating: number;
  text?: string;
  reviewer: {
    name: string;
    photo: string;
  };
}
