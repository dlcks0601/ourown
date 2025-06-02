import { MessageResponse, User } from './auth.type';

export interface NicknameUpdateResponse {
  message: MessageResponse;
  user: User;
}
