import { AppText } from '@/components/AppText';
import { calculateDday } from '@/constants/Day';
import {
  useDeleteMypageAnniversary,
  useGetMypageAnniversary,
} from '@/hooks/query/mypage.query';
import { useAuthStore } from '@/store/authStore';
import { AnniversaryResponse } from '@/types/couple.type';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ActionSheetIOS,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnniversaryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, partner, couple } = useAuthStore();
  const { data } = useGetMypageAnniversary();
  const anniv = data?.anniv ?? null;
  const { deleteMypageAnniversary } = useDeleteMypageAnniversary();
  const handleAnniversaryPress = (item: AnniversaryResponse) => {
    // 고정 기념일은 ActionSheet를 띄우지 않음
    const isFixed = item.type === '100일' || item.type.includes('생일');
    if (isFixed) return;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['수정', '삭제', '취소'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          router.push(`/mypage/patch-anniversary?id=${item.id}`);
        } else if (buttonIndex === 1) {
          deleteMypageAnniversary({ coupleId: user.coupleId, id: item.id! });
        }
      }
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <View className='flex-row items-center justify-center px-4'>
        <TouchableOpacity
          className='absolute left-4'
          onPress={() => router.back()}
        >
          <SimpleLineIcons
            name='arrow-left'
            size={18}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>

        <Text
          className={`text-2xl font-logo text-center ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          Anniversary
        </Text>
      </View>
      <FlatList
        className='mt-4'
        data={anniv}
        keyExtractor={(item) => item.id?.toString() ?? ''}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        renderItem={({ item }) => {
          const isFixed =
            item.type.includes('일') || item.type.includes('생일');
          return (
            <TouchableOpacity
              style={{
                backgroundColor: isDark ? '#222' : '#222',
                borderRadius: 20,
                padding: 20,
                width: '48%',
                minHeight: 180,
                justifyContent: 'space-between',
                // opacity: isFixed ? 0.5 : 1, // 반투명 제거
              }}
              onPress={() => handleAnniversaryPress(item)}
              disabled={isFixed}
            >
              <View className='flex-col items-start gap-1'>
                <AppText className='text-lg font-bold text-white'>
                  {item.type}
                </AppText>
                <AppText className='text-sm text-white'>
                  {item.date.slice(0, 10).replace(/-/g, '.')}
                </AppText>
              </View>
              <AppText className='text-3xl font-bold text-white text-right mt-6'>
                {calculateDday(item.date)}
              </AppText>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => {
          router.push('/mypage/add-anniversary');
        }}
      >
        <Ionicons
          name='add'
          size={24}
          color='white'
          className='absolute bottom-6 right-6 rounded-full bg-red-500 p-2'
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
