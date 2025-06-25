import { deleteTodo, doneTodo, getTodo, postTodo } from '@/api/todo/todo.api';
import { useAuthStore } from '@/store/authStore';
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
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      content,
    }: {
      coupleId: number;
      content: string;
    }) => postTodo(coupleId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo', coupleId],
      });
    },
  });
  return { postTodo: mutate };
};

export const useDoneTodoMutation = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({ todoId, coupleId }: { todoId: number; coupleId: number }) =>
      doneTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo', coupleId],
      });
    },
  });
  return { doneTodo: mutate };
};

export const useDeleteTodoMutation = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({ todoId, coupleId }: { todoId: number; coupleId: number }) =>
      deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo', coupleId],
      });
    },
  });
  return { deleteTodo: mutate };
};
