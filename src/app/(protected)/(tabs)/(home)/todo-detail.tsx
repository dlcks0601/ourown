// src/app/todo-detail.tsx
import { useGetTodo } from '@/hooks/query/todo.query';
import { useAuthStore } from '@/store/authStore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TodoDetailScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user.coupleId;

  const { data } = useGetTodo(coupleId);
  const todosByUser = data?.todosByUser;
  if (!todosByUser) return null;

  // 유저 ID가 아닌 상대방 ID만 가져오기
  const partnerId = Object.keys(todosByUser)
    .map(Number)
    .find((id) => id !== user.id);
  const partner = todosByUser[partnerId!];

  const sortedTodos = [...partner.todos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
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
          {partner.nickname} todo
        </Text>
      </View>
      <FlatList
        data={sortedTodos}
        className='px-4 mt-4'
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.isDone;
          return (
            <View className='flex-row items-center'>
              <View
                className={`w-6 h-6 rounded-full border-2 mr-3 ${
                  isSelected ? 'border-red-500 bg-red-500' : 'border-gray-400'
                }`}
              />
              <Text
                className={`text-lg ${
                  isSelected
                    ? isDark
                      ? 'text-gray-300'
                      : 'text-gray-400'
                    : isDark
                    ? 'text-white'
                    : 'text-black'
                }`}
                numberOfLines={1}
              >
                {item.content}
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
          <View className='border-b border-gray-200 mb-3 mt-3' />
        )}
      />
    </SafeAreaView>
  );
}
