import CheckInput from '@/components/CheckInput';
import {
  useDeleteListMutation,
  useDoneListMutation,
  useGetListMutation,
  usePostListMutation,
} from '@/hooks/query/list.query';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BucketScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { postList } = usePostListMutation();
  const { doneList } = useDoneListMutation();
  const { deleteList } = useDeleteListMutation();
  const { data } = useGetListMutation(coupleId);
  const list = data?.list ?? [];

  const categories = [
    { id: 1, label: '여행' },
    { id: 2, label: '데이트' },
    { id: 3, label: '맛집' },
    { id: 4, label: '취미' },
    { id: 5, label: '기타' },
  ];

  // 카테고리별 펼침 상태
  const [openCategories, setOpenCategories] = useState(
    categories.reduce((acc, cat) => {
      acc[cat.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  // 카테고리별 인풋 값
  const [inputValues, setInputValues] = useState<Record<number, string>>(
    categories.reduce((acc, cat) => {
      acc[cat.id] = '';
      return acc;
    }, {} as Record<number, string>)
  );

  // 저장된 상태 불러오기
  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem('openCategories');
        if (stored) {
          setOpenCategories(JSON.parse(stored));
        }
      } catch (e) {
        console.error('카테고리 상태 불러오기 실패', e);
      }
    };
    loadState();
  }, []);

  // 상태 변경될 때마다 저장
  useEffect(() => {
    AsyncStorage.setItem('openCategories', JSON.stringify(openCategories));
  }, [openCategories]);

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 카테고리별 그룹화
  const groupedList = categories.reduce((acc, cat) => {
    acc[cat.id] = list
      .filter((item) => item.categoryId === cat.id)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return acc;
  }, {} as Record<number, typeof list>);

  const handleAdd = (categoryId: number) => {
    const value = inputValues[categoryId];
    if (!value.trim()) return;

    postList(
      { coupleId, content: value, categoryId },
      {
        onSuccess: () => {
          setInputValues((prev) => ({
            ...prev,
            [categoryId]: '',
          }));
        },
      }
    );
  };
  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <Text
        className={`text-3xl font-logo mb-2 px-4 ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        Our List
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 카테고리별 출력 */}
        {categories.map((cat) => (
          <View key={cat.id} className='border-b border-gray-400 p-4'>
            {/* 카테고리 헤더 */}
            <TouchableOpacity
              onPress={() => toggleCategory(cat.id)}
              className='flex-row justify-between items-center'
            >
              <Text
                className={`text-2xl font-md ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {cat.label}
              </Text>
              {/* 여기 아이콘으로 교체 */}
              <EvilIcons
                name={openCategories[cat.id] ? 'chevron-down' : 'chevron-right'}
                size={36}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>

            {openCategories[cat.id] && (
              <View className='mt-4'>
                {/* 카테고리 안에 인풋 */}
                <CheckInput
                  value={inputValues[cat.id]}
                  onChangeText={(text) =>
                    setInputValues((prev) => ({
                      ...prev,
                      [cat.id]: text,
                    }))
                  }
                  onSubmit={() => handleAdd(cat.id)}
                  maxLength={20}
                />

                {/* 아이템 */}
                {groupedList[cat.id].map((item) => {
                  const isSelected = item.isDone;
                  const isMine = item.isOwn;
                  return (
                    <View
                      key={item.id}
                      className='flex-row items-center justify-between py-2'
                    >
                      <View className='flex-row items-center'>
                        <TouchableOpacity
                          onPress={() =>
                            doneList({
                              coupleId,
                              contentId: item.id,
                            })
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
                      {isMine && (
                        <TouchableOpacity
                          className='px-2'
                          onPress={() =>
                            deleteList({
                              coupleId,
                              contetnId: item.id,
                            })
                          }
                        >
                          <EvilIcons
                            name='close'
                            size={20}
                            color={isDark ? '#fff' : '#000'}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
