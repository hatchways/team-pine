import Avatar from '@mui/material/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
  photoUrl?: string;
  width?: number;
  height?: number;
}

const AvatarDisplay = ({ user, width, height, photoUrl }: Props): JSX.Element => {
  if (photoUrl !== '') {
    return <Avatar sx={{ width, height }} alt="Profile Image" src={photoUrl} />;
  } else {
    return (
      <Avatar sx={{ width, height }} alt="Profile Image">
        {user.name[0]}
      </Avatar>
    );
  }
};

export default AvatarDisplay;
