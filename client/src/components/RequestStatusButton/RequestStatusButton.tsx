import SettingsIcon from '@mui/icons-material/Settings';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import { Request } from '../../interface/Request';
import changeRequestStatus from '../../helpers/APICalls/changeRequestStatus';

interface Props {
  booking: Request;
  fontSize?: string;
}

export default function RequestStatusButton({ fontSize, booking }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const acceptRequest = () => {
    changeRequestStatus(booking.id, 'accepted');
    handleClose();
  };
  const declineRequest = () => {
    changeRequestStatus(booking.id, 'declined');
  };

  console.log(booking);

  return (
    <>
      <IconButton
        id="status-dropdown-button"
        aria-controls={open ? 'status-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon color="disabled" sx={{ fontSize: fontSize }} />
      </IconButton>
      <Menu
        id="status-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'status-dropdown-button' }}
      >
        <MenuItem onClick={acceptRequest}>Accept</MenuItem>
        <MenuItem onClick={declineRequest}>Decline</MenuItem>
      </Menu>
    </>
  );
}
