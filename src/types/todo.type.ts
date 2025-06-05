import { MessageResponse } from './auth.type';

export interface TodoResponse {
  id: number;
  coupleId: number;
  writerId: number;
  content: string;
  isDone: boolean;
  createdAt: string;
}

export interface PostTodoResponse {
  message: MessageResponse;
  todo: TodoResponse;
}

export interface UserTodos {
  nickname: string;
  todos: TodoResponse[];
}

export interface TodoUser {
  [userId: number]: UserTodos;
}

export interface GetTodoResponse {
  message: MessageResponse;
  todosByUser: TodoUser;
}

export interface DoneTodoResponse {
  message: MessageResponse;
  todo: TodoResponse;
}

export interface DeleteTodoResponse {
  message: MessageResponse;
}
