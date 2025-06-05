import {
  DeleteTodoResponse,
  DoneTodoResponse,
  GetTodoResponse,
  PostTodoResponse,
} from '@/types/todo.type';
import fetcher from '@/utils/fetcher';

export const postTodo = async (
  coupleId: number,
  content: string
): Promise<PostTodoResponse> => {
  const response = await fetcher<PostTodoResponse>({
    url: '/todo',
    method: 'POST',
    data: {
      coupleId,
      content,
    },
  });
  console.log(response.data);
  return response.data;
};

export const getTodo = async (coupleId: number): Promise<GetTodoResponse> => {
  const response = await fetcher<GetTodoResponse>({
    url: '/todo',
    method: 'GET',
    params: {
      coupleId,
    },
  });
  return response.data;
};

export const doneTodo = async (todoId: number): Promise<DoneTodoResponse> => {
  const response = await fetcher<DoneTodoResponse>({
    url: `/todo/${todoId}`,
    method: 'POST',
  });
  console.log(response.data);
  return response.data;
};

export const deleteTodo = async (
  todoId: number
): Promise<DeleteTodoResponse> => {
  const response = await fetcher<DeleteTodoResponse>({
    url: `/todo/${todoId}`,
    method: 'DELETE',
  });
  console.log(response.data);
  return response.data;
};
