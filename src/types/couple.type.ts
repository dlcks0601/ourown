import { MessageResponse } from './auth.type';

export interface AnniversaryResponse {
  type: string;
  days: number;
  date: string;
}

export interface CoupleInfoResponse {
  message: MessageResponse;
  dday: number;
  anniv: AnniversaryResponse[];
}
