import { AppText } from '@/components/AppText';
import { usePrevNotificationQuery } from '@/hooks/query/notification.query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    data: notificationData,
    refetch,
    isLoading,
  } = usePrevNotificationQuery();
  const [localNotifications, setLocalNotifications] = useState<any[]>([]);

  // 알림 페이지에 들어올 때 최신순으로 정렬
  useEffect(() => {
    if (notificationData?.notifications) {
      const sortedNotifications = notificationData.notifications.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLocalNotifications(sortedNotifications);
    }
  }, [notificationData]);

  const notifications = localNotifications;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'LIST_TOGGLED':
        return 'checkmark-circle';
      case 'MEMO_CREATED':
        return 'document-text';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'LIST_TOGGLED':
        return '#10B981'; // green
      case 'MEMO_CREATED':
        return '#F59E0B'; // amber
      default:
        return isDark ? '#FFFFFF' : '#000000';
    }
  };

  const renderNotification = ({ item }: { item: any }) => (
    <View
      className={`p-4 border-b ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}
      style={{
        backgroundColor: isDark ? '#1F2937' : '#F9FAFB',
      }}
    >
      <View className='flex-row items-start justify-between'>
        <View className='flex-1 flex-row items-start gap-3'>
          <View
            className='w-8 h-8 rounded-full items-center justify-center'
            style={{ backgroundColor: getNotificationColor(item.type) + '20' }}
          >
            <Ionicons
              name={getNotificationIcon(item.type) as any}
              size={16}
              color={getNotificationColor(item.type)}
            />
          </View>
          <View className='flex-1'>
            <AppText
              className={`text-sm ${isDark ? 'text-white' : 'text-black'}`}
            >
              {JSON.parse(item.payload).message}
            </AppText>
            <AppText
              className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {dayjs(item.createdAt).format('MM월 DD일 HH:mm')}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* 헤더 */}
      <View
        className={`flex-row items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name='arrow-back'
              size={24}
              color={isDark ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <AppText className='font-semibold text-lg'>알림</AppText>
        </View>
      </View>

      {/* 알림 목록 */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
              tintColor={isDark ? '#FFFFFF' : '#000000'}
            />
          }
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <EvilIcons
            name='bell'
            size={64}
            color={isDark ? '#374151' : '#D1D5DB'}
          />
          <AppText
            className={`text-lg mt-4 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            알림이 없습니다
          </AppText>
          <AppText
            className={`text-sm mt-2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            새로운 알림이 오면 여기에 표시됩니다
          </AppText>
        </View>
      )}
    </SafeAreaView>
  );
}
