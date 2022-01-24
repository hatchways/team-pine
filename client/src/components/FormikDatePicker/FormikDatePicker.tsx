import DatePicker from '@mui/lab/DatePicker';
import { SelectChangeEvent, Select, Box, InputLabel, InputBase, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format, hoursToMilliseconds } from 'date-fns';
import { useState } from 'react';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginBottom: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    fontSize: 16,
    width: '100%',
    padding: '15px',
  },
}));

interface Props {
  dateField: string;
  date: Date;
  setFieldValue: (field: string, value: Date | null) => void;
  label: string;
  inputId: string;
  error?: boolean;

  [inputProps: string]: any;
}

export default function FormikDatePicker({
  dateField,
  date,
  setFieldValue,
  label,
  inputId,
  error,
  ...rest
}: Props): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    const hourDifference = parseInt(event.target.value) - date.getHours();
    const newDate = new Date(Date.parse(date.toString()) + hoursToMilliseconds(hourDifference));
    setFieldValue(dateField, newDate);
  };

  return (
    <DatePicker
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      minDate={new Date(Date.now())}
      value={date}
      onChange={(value) => setFieldValue(dateField, value)}
      renderInput={({ inputRef, InputProps }) => (
        <Box>
          <InputLabel
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              color: 'black',
            }}
            htmlFor={inputId}
            error={error}
          >
            {label}
          </InputLabel>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              borderRadius: 1,
              border: '1px solid #dbdbdb',
              marginBottom: 2,
            }}
          >
            {InputProps?.endAdornment}
            <StyledInput
              {...rest}
              sx={{ fontWeight: 'bold' }}
              value={format(date, 'd MMM yyyy')}
              id={inputId}
              ref={inputRef}
              onClick={() => setOpen(true)}
            />
            <Box
              sx={{
                color: 'black',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderLeft: '1px solid #dbdbdb',
                height: '100%',
              }}
            >
              <Select
                sx={{ fontSize: '1rem', fontWeight: 'bold', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                onChange={handleChange}
                value={date.getHours().toString()}
                inputProps={{ 'aria-label': 'Without label' }}
                error={error}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <MenuItem value={i} key={i}>
                    {(() => {
                      if (i < 13 && i > 0) {
                        return `${i} am`;
                      } else if (i > 12) {
                        return `${i - 12} pm`;
                      } else {
                        return '12 am';
                      }
                    })()}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Box>
      )}
    />
  );
}
