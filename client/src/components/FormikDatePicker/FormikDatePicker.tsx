import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

interface Props {
  field: string;
  date: Date;
  setFieldValue: (field: string, value: any) => void;
  label: string;
}

export default function FormikDatePicker({ field, date, setFieldValue, label }: Props): JSX.Element {
  return (
    <DatePicker
      label={label}
      value={date}
      onChange={(value) => setFieldValue(field, value)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
