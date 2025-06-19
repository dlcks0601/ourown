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

export interface WidgetResponse {
  photoUrl: string;
}

export interface CoupleImageResponse {
  message: MessageResponse;
  widget: WidgetResponse;
}
