import { Box, Dialog, DialogTitle, List } from '@mui/material';
import Review from '../../interface/Review';
import { useTheme } from '@mui/material';
import ProfileReview from '../ProfileReview/ProfileReview';

interface Props {
  profileName: string;
  open: boolean;
  onClose: () => void;
  reviews: Review[];
}

export default function ReviewsDialog({ profileName, open, onClose, reviews }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Dialog fullWidth={true} maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>Reviews for {profileName}</DialogTitle>
      <List>
        {reviews.map((review) => {
          return (
            <Box sx={{ padding: `${theme.spacing(2)} ${theme.spacing(2)}` }} key={review._id}>
              <ProfileReview review={review} />
            </Box>
          );
        })}
      </List>
    </Dialog>
  );
}
