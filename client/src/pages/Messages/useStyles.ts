import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 900,
  },
  inboxSection: {
    width: '100%',
    height: '90vh',
  },
  messageSection: {
    height: '65vh',
    overflowY: 'auto',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    border: '2px solid #000',
  },
});

export default useStyles;
