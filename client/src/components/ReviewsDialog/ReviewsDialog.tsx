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
  initialPageCount: number;
}

export default function ReviewsDialog({
  profileName,
  open,
  onClose,
  initialReviews,
  initialPageCount,
}: Props): JSX.Element {
  const theme = useTheme();
  const { updateSnackBarMessage } = useSnackBar();
  const { profileId } = useParams<{ profileId: string }>();
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(initialPageCount);
  const [reviewPages, setReviewPages] = useState<Record<number, Review[]>>({ 1: initialReviews });

  const firstUpdate = useRef(true);
  const visitedPages = useRef([1]);

  useEffect(() => {
    if (!visitedPages.current.includes(page)) {
      visitedPages.current.push(page);
      getReviews(profileId, page).then((res) => {
        if (!res.error) {
          const shallowReviewPages = { ...reviewPages };
          shallowReviewPages[page] = res.success.reviews;
          setReviewPages(shallowReviewPages);
          setPageCount(Math.floor(res.success.count / 10) + 1);
        } else {
          console.error(res.error);
          updateSnackBarMessage('Reviews not found');
        }
      });
    }
  }, [page, profileId, updateSnackBarMessage, reviewPages, pageCount]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      const timeout = setTimeout(() => {
        visitedPages.current = [];
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [page]);

  useEffect(() => {
    setPageCount(initialPageCount);
  }, [initialPageCount]);

  return (
    <Dialog fullWidth={true} maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>Reviews for {profileName}</DialogTitle>
      {pageCount > 1 ? <Pagination count={pageCount} page={page} setPage={setPage} /> : null}
      <List>
        {reviewPages[page]
          ? reviewPages[page].map((review) => {
              return (
                <Box sx={{ padding: `${theme.spacing(2)} ${theme.spacing(2)}` }} key={review._id}>
                  <ProfileReview review={review} />
                </Box>
              );
            })
          : null}
      </List>
      {pageCount > 1 ? <Pagination count={pageCount} page={page} setPage={setPage} /> : null}
    </Dialog>
  );
}
