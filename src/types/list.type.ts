import { MessageResponse } from './auth.type';

export interface ListResponse {
  id: number;
  isOwn: boolean;
  content: string;
  categoryId: number;
  createdAt: string;
  isDone: boolean;
}

export interface BucketListResponse {
  message: MessageResponse;
  list: ListResponse[];
}

export interface PostListResponse {
  message: MessageResponse;
}

export interface DoneListResponse {
  message: MessageResponse;
}

export interface DeleteListResponse {
  message: MessageResponse;
}
