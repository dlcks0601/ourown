import { MessageResponse } from './auth.type';

export interface MemoResponse {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
  };
  isWidgetMemo: boolean;
}

export interface GetMemoResponse {
  message: MessageResponse;
  memo: MemoResponse[];
}

export interface PostMemoResponse {
  message: MessageResponse;
  memo: MemoResponse;
}

export interface PostWidgetMemoResponse {
  message: MessageResponse;
}

export interface DeleteMemoResponse {
  message: MessageResponse;
}

export interface PutMemoResponse {
  message: MessageResponse;
  memo: MemoResponse;
}
