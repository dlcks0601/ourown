import { MessageResponse, Partner, User } from './auth.type';

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

export interface Couple {
  anniversary: string;
}

export interface ConnectCoupleResponse {
  message: MessageResponse;
  user: User;
  partner: Partner;
  couple: Couple;
}

export interface CoupleMatchResponse {
  success: boolean;
  message: MessageResponse;
  user?: User;
  couple?: Couple;
  partner?: Partner;
}
