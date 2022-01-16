import React, { useLayoutEffect } from 'react';
import { Button, CircularProgress, IconButton, Typography, Skeleton, Grid } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Formik, FormikHelpers } from 'formik';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { makeStyles } from '@mui/styles';
import editProfile from '../../../helpers/APICalls/editProfile';
import { useSnackBar } from '../../../context/useSnackbarContext';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiButton-root': {
      textTransform: 'none',
    },
  },
  displayWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  displayPic: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  displayText: {
    maxWidth: 250,
    padding: '10px',
    color: '#969696',
  },
  uploadButton: {
    height: 70,
    textTransform: 'none',
  },
  deleteButton: {
    color: 'black',
  },
});

interface ProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: any;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const fileInputButton = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // event.target.files[0]
      // call api to upload new profile picture
      //on success or error
      updateSnackBarMessage('Profile Photo uploaded successfuly!!!');
    }
  };
  const fileSelectHnadler = () => {
    if (fileInputButton.current) {
      fileInputButton.current.click();
    }
  };
  const deleteClickHandler = () => {
    // confirm the action
    // call api to delete profile picture
    updateSnackBarMessage('Deleted profile photo!!!');
  };
  return (
    <Box
      sx={{
        margin: '0 auto',
      }}
      className={classes.root}
    >
      <SettingHeader header={header} />
      <Box className={classes.displayWrapper}>
        <Box className={classes.displayPic} py={2}>
          {currentUser ? (
            <AvatarDisplay
              width={170}
              height={170}
              user={currentUser}
              photoUrl={currentProfile.photo}
              loggedIn={!!currentUser}
            />
          ) : (
            ''
          )}
        </Box>
        <Typography fontSize={{ xs: 14, md: 16 }} className={classes.displayText}>
          Be sure to use a photo that clearly shows your face
        </Typography>
      </Box>
      <Box py={5} px={2}>
        <Button
          variant="outlined"
          size="large"
          className={classes.uploadButton}
          onClick={() => {
            fileSelectHnadler();
          }}
        >
          Upload a file from your device
        </Button>
        <input
          ref={fileInputButton}
          type="file"
          onChange={(e) => {
            fileChangeHandler(e);
          }}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </Box>
      <Box p={1}>
        <Button
          startIcon={<DeleteForeverIcon style={{ fill: 'black' }} />}
          className={classes.deleteButton}
          onClick={() => {
            deleteClickHandler();
          }}
          style={{ color: '#969696' }}
        >
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};
export default ProfilePhoto;
