import { MessageResponse, User } from './auth.type';

export interface NicknameUpdateResponse {
  message: MessageResponse;
  user: User;
}

export interface UserBirthdayUpdateResponse {
  message: MessageResponse;
  user: User;
}
