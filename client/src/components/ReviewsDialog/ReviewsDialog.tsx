import { Box, Dialog, DialogTitle, List } from '@mui/material';
import Review from '../../interface/Review';
import { useTheme } from '@mui/material';
import ProfileReview from '../ProfileReview/ProfileReview';
import Pagination from '../../components/Pagination/Pagination';
import { useEffect, useRef, useState } from 'react';
import getReviews from '../../helpers/APICalls/getReviews';
import { useParams } from 'react-router-dom';
import { useSnackBar } from '../../context/useSnackbarContext';

interface Props {
  initialReviews: Review[];
  profileName: string;
  open: boolean;
  onClose: () => void;
  pageCount: number;
}

export default function ReviewsDialog({ profileName, open, onClose, initialReviews, pageCount }: Props): JSX.Element {
  const theme = useTheme();
  const { updateSnackBarMessage } = useSnackBar();
  const { profileId } = useParams<{ profileId: string }>();
  const [page, setPage] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      getReviews(profileId, page).then((res) => {
        if (!res.error) {
          setReviews(res.success.reviews);
        } else {
          console.error(res.error);
          updateSnackBarMessage('Reviews not found');
        }
      });
    }
  }, [page, profileId, updateSnackBarMessage]);

  return (
    <Dialog fullWidth={true} maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>Reviews for {profileName}</DialogTitle>
      {pageCount > 1 ? <Pagination count={pageCount} page={page} setPage={setPage} /> : null}
      <List>
        {reviews.map((review, i) => {
          return (
            <Box sx={{ padding: `${theme.spacing(2)} ${theme.spacing(2)}` }} key={i}>
              <ProfileReview review={review} />
            </Box>
          );
        })}
      </List>
    </Dialog>
  );
}
