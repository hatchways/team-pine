import { Schedule } from './Schedule';

export interface ScheduleApiDataSuccess {
  schedule: Schedule;
}

export interface ScheduleApiData {
  error?: { message: string };
  success?: ScheduleApiDataSuccess;
}

export interface ScheduleBasicData {
  schedules: Schedule[];
}

export interface ScheduleListApiData {
  error?: { message: string };
  success?: ScheduleBasicData;
}
