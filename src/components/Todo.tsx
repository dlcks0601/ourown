import { useDoneTodoMutation, useGetTodo } from '@/hooks/query/todo.query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TodoWidget() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const router = useRouter();
  const coupleId = user.coupleId;
  const { data } = useGetTodo(coupleId);
  const { doneTodo } = useDoneTodoMutation();
  const todosByUser = data?.todosByUser;
  if (!todosByUser) return null;

  const userIds = Object.keys(todosByUser).map(Number);
  const myData = todosByUser[user.id];
  const partnerId = userIds.find((id) => id !== user.id);
  const partnerData = partnerId ? todosByUser[partnerId] : null;

  const renderCard = (currentUser: typeof myData, isCurrentUser: boolean) => {
    const cardColor = isCurrentUser
      ? isDark
        ? 'bg-[#93c372]'
        : 'bg-[#227bd342]'
      : 'bg-[#fca3d2]';

    const sortedTodos = [...currentUser.todos]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);

    return (
      <TouchableOpacity
        key={currentUser.nickname}
        className={`flex-1 aspect-square ${cardColor} rounded-2xl p-4`}
        onPress={() =>
          router.push(isCurrentUser ? '/todo-setting' : '/todo-detail')
        }
        activeOpacity={0.9}
      >
        <View className='flex-row justify-between items-center mb-1'>
          <Text className='text-red-500 font-bold text-xl'>
            {currentUser.nickname}
          </Text>
          <Text className='text-white font-bold text-2xl'>
            {currentUser.todos.filter((todo) => !todo.isDone).length}
          </Text>
        </View>

        <View className='flex-col'>
          {sortedTodos.map((todo) => {
            const isSelected = todo.isDone;
            return (
              <TouchableOpacity
                key={todo.id}
                className='flex-row items-center my-2'
                onPress={() => {
                  if (isCurrentUser) {
                    doneTodo({ todoId: todo.id });
                  }
                }}
                activeOpacity={isCurrentUser ? 0.7 : 1}
              >
                <View
                  className={`w-6 h-6 rounded-full border-2 mr-3 ${
                    isSelected ? 'border-red-500 bg-red-500' : 'border-gray-400'
                  }`}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  className={`text-lg w-[120px] ${
                    isSelected
                      ? isDark
                        ? 'text-gray-300'
                        : 'text-gray-400'
                      : isDark
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  {todo.content}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className='flex-row justify-between w-full gap-4'>
      {myData && renderCard(myData, true)}
      {partnerData && renderCard(partnerData, false)}
    </View>
  );
}
