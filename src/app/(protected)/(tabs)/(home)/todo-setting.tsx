import {
  useDeleteTodoMutation,
  useDoneTodoMutation,
  useGetTodo,
  usePostTodoMutation,
} from '@/hooks/query/todo.query';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
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
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='px-6 pt-6'>
        <Text
          className={`text-3xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {user.nickname} Todo
        </Text>

        {/* 입력창 */}
        <View className='flex-row items-center mb-4'>
          <TouchableOpacity
            activeOpacity={1}
            className='w-6 h-6 border-2 mr-3 border-gray-400 rounded-full'
          />

          <TextInput
            // className={`text-sm  ${isDark ? 'text-white' : 'text-black'}`}
            placeholder='내용을 추가해보세요.'
            placeholderTextColor={isDark ? '#999' : '#ccc'}
            value={inputValue}
            onChangeText={setInputValue}
            blurOnSubmit={true}
            onSubmitEditing={handleAdd}
            returnKeyType='done'
            style={{
              color: isDark ? '#ffffff' : '#000000',
              fontSize: 16,
            }}
          />
        </View>

        {/* 투두 리스트 */}
        <FlatList
          data={myTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = item.isDone;

            return (
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center'>
                  <TouchableOpacity
                    onPress={() => doneTodo({ todoId: item.id })}
                    className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                      isSelected
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-400'
                    }`}
                  />

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
                  onPress={() => deleteTodo({ todoId: item.id })}
                >
                  <EvilIcons
                    name='close'
                    size={20}
                    color={isDark ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View className='border-b border-gray-200 mb-3 mt-3' />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
