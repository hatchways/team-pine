import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AvatarDisplay from '../../../components/AvatarDisplay/AvatarDisplay';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { User } from '../../../interface/User';
import { Profile } from '../../../interface/Profile';
import { makeStyles } from '@mui/styles';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { profilePhotoUpload, profilePhotoDelete } from '../../../helpers/APICalls/profilePhoto';
import { useAuth } from '../../../context/useAuthContext';

const useStyles = makeStyles({
  root: {
    '& .MuiButton-root': {
      textTransform: 'none',
    },
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
});

interface ProfilePhotoProps {
  header: string;
  currentUser?: User;
  currentProfile?: Profile;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ header, currentUser, currentProfile }) => {
  const fileInputButton = React.useRef<HTMLInputElement>(null);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { updateProfileContext } = useAuth();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      profilePhotoUpload(event.target.files[0]).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          updateProfileContext(data.success);
          updateSnackBarMessage('Profile Photo is uploaded successfuly!!!');
        } else {
          updateSnackBarMessage('An unexpected error occurred. Please try again');
        }
      });
    }
  };
  const fileSelectHandler = () => {
    if (fileInputButton.current) {
      fileInputButton.current.click();
    }
  };
  const deleteClickHandler = () => {
    profilePhotoDelete().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateProfileContext(data.success);
        updateSnackBarMessage('Deleted profile photo!!!');
      }
    });
  };
  return (
    <Box
      sx={{
        margin: '0 auto',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <SettingHeader header={header} />
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
        <Box display="flex" justifyContent="center" alignContent="center" py={2}>
          {currentUser ? (
            <AvatarDisplay
              width={170}
              height={170}
              user={currentUser}
              photoUrl={currentProfile ? currentProfile.photo : ''}
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
        <Button variant="outlined" size="large" className={classes.uploadButton} onClick={fileSelectHandler}>
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
          onClick={deleteClickHandler}
          style={{ color: '#969696' }}
        >
          Delete photo
        </Button>
      </Box>
    </Box>
  );
};
export default ProfilePhoto;
