import CheckInput from '@/components/CheckInput';
import {
  useDeleteTodoMutation,
  useDoneTodoMutation,
  useGetTodo,
  usePostTodoMutation,
} from '@/hooks/query/todo.query';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TodoSettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user.coupleId;

  const { data } = useGetTodo(coupleId);
  const { doneTodo } = useDoneTodoMutation();
  const { postTodo } = usePostTodoMutation();
  const { deleteTodo } = useDeleteTodoMutation();
  const todosByUser = data?.todosByUser;
  const [inputValue, setInputValue] = useState('');

  if (!todosByUser) return null;

  // 최신순 정렬
  const myTodos = [...(todosByUser[user.id]?.todos ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    postTodo(
      { coupleId, content: inputValue },
      {
        onSuccess: () => {
          setInputValue('');
        },
      }
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <View className='flex-row items-center justify-center py-1'>
        <TouchableOpacity
          className='absolute left-4 top-2'
          onPress={() => router.back()}
        >
          <SimpleLineIcons
            name='arrow-left'
            size={18}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Text
          className={`text-3xl font-logo ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {user.nickname} todo
        </Text>
      </View>

      {/* 투두 리스트 */}
      <FlatList
        data={myTodos}
        className='px-4 mt-4'
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={myTodos.length > 16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CheckInput
            value={inputValue}
            onChangeText={setInputValue}
            onSubmit={handleAdd}
            maxLength={20}
          />
        }
        renderItem={({ item }) => {
          const isSelected = item.isDone;

          return (
            <View className='flex-row items-center justify-between pt-2 pb-2'>
              <View className='flex-row items-center'>
                <TouchableOpacity
                  onPress={() => doneTodo({ todoId: item.id, coupleId })}
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                    isSelected ? 'border-red-500 bg-red-500' : 'border-gray-400'
                  }`}
                />
                <View className='flex-1'>
                  <Text
                    numberOfLines={1}
                    className={`text-lg ${
                      isSelected
                        ? isDark
                          ? 'text-gray-300'
                          : 'text-gray-400'
                        : isDark
                        ? 'text-white'
                        : 'text-black'
                    }`}
                  >
                    {item.content}
                  </Text>
                </View>
                {/* 삭제 버튼 */}

                <TouchableOpacity
                  onPress={() => deleteTodo({ todoId: item.id, coupleId })}
                >
                  <EvilIcons
                    name='close'
                    size={20}
                    color={isDark ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View className='border-b border-gray-200' />
        )}
      />
    </SafeAreaView>
  );
}
