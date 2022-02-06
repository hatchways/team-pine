import { ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material';
import Review from '../../interface/Review';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

interface Props {
  review: Review;
}

export default function ProfileReview({ review }: Props): JSX.Element {
  return (
    <>
      <Rating value={review.rating} readOnly />
      <ListItem sx={{ padding: '0', alignItems: 'flex-start' }}>
        <ListItemAvatar>
          <AvatarDisplay
            loggedIn
            user={{ name: review.name, email: 'example@example.com' }}
            photoUrl={review.photo}
          ></AvatarDisplay>
        </ListItemAvatar>
        {review.text ? <ListItemText>{review.text}</ListItemText> : null}
      </ListItem>
    </>
  );
}
