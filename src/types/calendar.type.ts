import { MessageResponse } from './auth.type';

export interface ScheduleResponse {
  userId: number;
  title: string;
  start: string;
  end: string;
}

export interface CalendarResponse {
  message: MessageResponse;
  schedule: ScheduleResponse[];
}

export interface PostCalendarResponse {
  message: MessageResponse;
  schedule: ScheduleResponse;
}
