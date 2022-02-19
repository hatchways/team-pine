import Avatar from '@mui/material/Avatar';

interface Props {
  loggedIn: boolean;
  name: string;
  photoUrl?: string;
  width?: number;
  height?: number;
}

const AvatarDisplay = ({ name, width, height, photoUrl }: Props): JSX.Element => {
  if (photoUrl !== '') {
    return <Avatar sx={{ width, height }} alt="Profile Image" src={photoUrl} />;
  } else {
    return (
      <Avatar sx={{ width, height }} alt="Profile Image">
        {name[0]}
      </Avatar>
    );
  }
};

export default AvatarDisplay;
