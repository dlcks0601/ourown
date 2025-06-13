import CheckInput from '@/components/CheckInput';
import {
  useDoneListMutation,
  useGetListMutation,
  usePostListMutation,
} from '@/hooks/query/list.query';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecondScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { postList } = usePostListMutation();
  const { doneList } = useDoneListMutation();
  const [inputValue, setInputValue] = useState('');
  const { data } = useGetListMutation(coupleId);
  const list = data?.list ?? [];

  // 최신순 정렬
  const sortedList = [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    postList(
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
      className={`flex-1 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <Text
        className={`text-3xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        버킷리스트
      </Text>
      <FlatList
        data={sortedList}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={sortedList.length > 16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CheckInput
            value={inputValue}
            onChangeText={setInputValue}
            onSubmit={handleAdd}
          />
        }
        renderItem={({ item }) => {
          const isSelected = item.isDone;
          const isMine = item.isOwn;

          return (
            <View className='flex-row items-center justify-between pt-2 pb-2'>
              <View className='flex-row items-center'>
                <TouchableOpacity
                  onPress={() =>
                    doneList({ coupleId: user.coupleId, contentId: item.id })
                  }
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                    isSelected
                      ? isMine
                        ? 'bg-red-500 border-red-500'
                        : 'bg-blue-500 border-blue-500'
                      : isMine
                      ? 'border-red-200'
                      : 'border-blue-200'
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

              {/* 삭제 버튼 구현 필요*/}
              {isMine && (
                <TouchableOpacity>
                  <EvilIcons
                    name='close'
                    size={20}
                    color={isDark ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              )}
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
