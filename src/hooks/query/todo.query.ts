import { deleteTodo, doneTodo, getTodo, postTodo } from '@/api/todo/todo.api';
import {
  DeleteTodoResponse,
  DoneTodoResponse,
  PostTodoResponse,
} from '@/types/todo.type';
import { queryClient } from '@/utils/queryClinet';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetTodo = (coupleId: number) => {
  return useQuery({
    queryKey: ['todo', coupleId],
    queryFn: () => getTodo(coupleId),
    enabled: !!coupleId,
  });
};

export const usePostTodoMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      content,
    }: {
      coupleId: number;
      content: string;
    }) => postTodo(coupleId, content),
    onSuccess: (data: PostTodoResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      });
    },
  });
  return { postTodo: mutate };
};

export const useDoneTodoMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({ todoId }: { todoId: number }) => doneTodo(todoId),
    onSuccess: (data: DoneTodoResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      });
    },
  });
  return { doneTodo: mutate };
};

export const useDeleteTodoMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({ todoId }: { todoId: number }) => deleteTodo(todoId),
    onSuccess: (data: DeleteTodoResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      });
    },
  });
  return { deleteTodo: mutate };
};
