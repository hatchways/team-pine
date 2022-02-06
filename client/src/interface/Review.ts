export default interface Review {
  rating: number;
  text?: string;
  reviewer: {
    name: string;
    photo: string;
  };
}
