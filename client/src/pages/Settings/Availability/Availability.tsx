import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography, Badge, Divider, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingHeader from '../../../components/SettingsHeader/SettingsHeader';
import { Schedule, Days } from '../../../interface/Schedule';
import { getActiveSchedule, createNewSchedule, fetchListOfAllSchedule } from '../../../helpers/APICalls/schedule';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { te } from 'date-fns/locale';

const hours = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23];

const useStyles = makeStyles({
  root: {
    '& .MuiButton-root': {
      textTransform: 'none',
    },
  },
  titleWrapper: {},
  border: {
    borderRadius: 5,
    border: '1px solid #dbdbdb',
    width: '100%',
  },
  input: {
    padding: 10,
    height: 55,
  },
  select: {
    minWidth: 150,
    height: 50,
  },
});
const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
interface AvailabilityProps {
  header: string;
}
const initialSchedule = {
  name: '',
  days: {},
};
const Availability: React.FC<AvailabilityProps> = ({ header }) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [activeSchedule, setActiveSchedule] = useState<Schedule>(initialSchedule);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
  const [tempSchedule, setTempSchedule] = useState<Schedule>();
  const [listOfAllSchedules, setListOfAllSchedules] = useState<Schedule[]>();
  const scheduleNameInput = React.useRef<HTMLInputElement>(null);

  const fetchSchedules = useCallback(() => {
    fetchListOfAllSchedule()
      .then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          setListOfAllSchedules(data.success.schedules);
        } else {
          updateSnackBarMessage('Unexpected Error');
        }
      })
      .catch((err) => {
        updateSnackBarMessage(err);
      });
  }, [updateSnackBarMessage]);

  useEffect(() => {
    getActiveSchedule()
      .then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          setActiveSchedule(data.success.schedule);
        } else {
          updateSnackBarMessage('Unexpected Error');
        }
      })
      .catch((err) => {
        updateSnackBarMessage(err);
      });
    fetchSchedules();
  }, [updateSnackBarMessage, fetchSchedules]);

  const handleChange = (event: SelectChangeEvent<string | number>, day: string, field: string) => {
    const {
      target: { value },
    } = event;
    if (value === '') return;
    const hour = typeof value === 'string' ? parseInt(value) : value;

    if (!tempSchedule) {
      setTempSchedule({ name: 'New Schedule', days: selectedSchedule?.days || {} });
    }
    if (!tempSchedule) return;
    if (hour) {
      if (!tempSchedule.days[day as keyof typeof tempSchedule.days]) {
        tempSchedule!.days[day as keyof typeof tempSchedule.days] = {
          isAvailable: true,
        };
      }
      if (field === 'start') {
        tempSchedule.days[day as keyof typeof tempSchedule.days]!.start = hour;
      } else if (field === 'end') {
        tempSchedule.days[day as keyof typeof tempSchedule.days]!.end = hour;
      }
    }
    console.log(tempSchedule);
    setSelectedSchedule({ ...tempSchedule });
  };
  const onSelectedScheduleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    listOfAllSchedules?.map((schedule) => {
      if (schedule._id === value) {
        setSelectedSchedule(schedule);
        console.log(schedule);
      }
      return schedule;
    });
  };
  const handleCreateNewSchedule = (event: React.MouseEvent) => {
    const scheduleName = scheduleNameInput.current?.value;
    if (!scheduleName) {
      updateSnackBarMessage('Please select a valid name!!');
      return;
    }
    tempSchedule!.name = scheduleName;
    if (!tempSchedule) return;
    createNewSchedule(tempSchedule)
      .then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error.message);
        } else if (data.success) {
          setSelectedSchedule(data.success.schedule);
          fetchSchedules();
          updateSnackBarMessage(`Schedule '${data.success.schedule.name}' is created successfuly`);
        } else {
          updateSnackBarMessage('Unexpected Error');
        }
      })
      .catch((err) => {
        updateSnackBarMessage('Create new Schedule');
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
      <Box width="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="start-flex">
        <Box mb={2} display="flex" justifyContent="flex-start" alignItems="center" className={classes.titleWrapper}>
          <Button startIcon={<CalendarTodayIcon color="primary" />} style={{ color: 'black' }}>
            <Typography fontWeight="bold">17 - 23 June 2019</Typography>
          </Button>
          <Box display="flex" mx={5} justifyContent="flex-start" alignItems="center">
            <Typography mr={2}>Now Showing:</Typography>
            <FormControl>
              <InputLabel id="select-label">Schedule</InputLabel>
              <Select
                onChange={onSelectedScheduleChange}
                label="Select Schedule"
                value={selectedSchedule?._id || ''}
                className={classes.select}
              >
                {listOfAllSchedules?.map((schedule) => {
                  return (
                    <MenuItem key={schedule._id} value={schedule._id}>
                      {schedule.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexDirection="column" justifyContent="flex-start" className={classes.border}>
          {weekDays.map((day) => {
            return (
              <Box key={day}>
                <Box mx={5} my={2} width="100%" display="flex" justifyContent="flext-start" alignItems="center">
                  <Box width={200} mr={8} display="flex" sx={{ textTransform: 'capitalize' }}>
                    <Typography fontWeight="bold">{day}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box mr={8} display="flex" alignItems="center">
                      <Typography px={6} fontWeight="bold">
                        FROM
                      </Typography>
                      <Box minWidth={100}>
                        <Select
                          fullWidth
                          onChange={(e) => {
                            handleChange(e, day, 'start');
                          }}
                          value={selectedSchedule?.days[day as keyof typeof selectedSchedule.days]?.start || ''}
                          className={classes.select}
                        >
                          {hours.map((hour) => {
                            return (
                              <MenuItem key={hour} value={hour}>
                                {hour}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Box>
                    </Box>
                    <Box mx={5} display="flex" alignItems="center">
                      <Typography px={1} fontWeight="bold">
                        TO
                      </Typography>
                      <Box minWidth={100}>
                        <Select
                          fullWidth
                          name="end"
                          onChange={(e) => {
                            handleChange(e, day, 'end');
                          }}
                          value={selectedSchedule?.days[day as keyof typeof selectedSchedule.days]?.end || ''}
                          className={classes.select}
                        >
                          {hours.map((hour) => {
                            return (
                              <MenuItem key={hour} value={hour}>
                                {hour}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Divider />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box py={5} display="flex">
          <TextField inputRef={scheduleNameInput} id="schedule-name" label="Schedule Name" className={classes.input} />
          <Box pr={2} />
          <Button variant="contained" onClick={handleCreateNewSchedule} className={classes.input}>
            Submit new Schedule
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Availability;
