import SettingsIcon from '@mui/icons-material/Settings';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Request } from '../../interface/Request';

interface Props {
  booking: Request;
  fontSize?: string;
  onStatusChange: (status: string) => void;
}

export default function RequestStatusButton({ fontSize, booking, onStatusChange }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState<string>(booking.status);

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const acceptRequest = () => {
    setStatus('accepted');
    handleClose();
  };
  const declineRequest = () => {
    setStatus('declined');
    handleClose();
  };
  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

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
