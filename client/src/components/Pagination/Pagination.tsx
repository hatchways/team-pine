import { Pagination as MUIPagination } from '@mui/material';
import { useTheme } from '@mui/material';

interface Props {
  count: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ count, page, setPage }: Props): JSX.Element {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <MUIPagination
      sx={{
        display: 'flex',
        paddingBottom: theme.spacing(2),
        justifyContent: 'center',
      }}
      count={count}
      page={page}
      onChange={handleChange}
    />
  );
}
