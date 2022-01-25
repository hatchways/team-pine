import { ScheduleApiData, ScheduleListApiData } from '../../interface/ScheduleApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Schedule } from '../../interface/Schedule';
export const getActiveSchedule = async (): Promise<ScheduleApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/availability/active`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const createNewSchedule = async (newSchedule: Schedule): Promise<ScheduleApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSchedule),
    credentials: 'include',
  };
  return await fetch(`/availability`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const fetchListOfAllSchedule = async (): Promise<ScheduleListApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/availability`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
