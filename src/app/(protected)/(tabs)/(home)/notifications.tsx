import { AppText } from '@/components/AppText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNotificationStore } from '@/store/notificationStore';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    removeNotification,
  } = useNotificationStore();

  const handleMarkAllAsRead = () => {
    Alert.alert('모든 알림 읽음 처리', '모든 알림을 읽음 처리하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: markAllAsRead },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('모든 알림 삭제', '모든 알림을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: clearNotifications },
    ]);
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert('알림 삭제', '이 알림을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => removeNotification(id),
      },
    ]);
  };

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
    <TouchableOpacity
      className={`p-4 border-b ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}
      onPress={() => !item.isRead && markAsRead(item.id)}
      style={{
        backgroundColor: item.isRead
          ? isDark
            ? '#1F2937'
            : '#F9FAFB'
          : isDark
          ? '#374151'
          : '#FFFFFF',
        borderLeftWidth: 4,
        borderLeftColor: item.isRead
          ? 'transparent'
          : getNotificationColor(item.type),
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
              className={`text-sm ${isDark ? 'text-white' : 'text-black'} ${
                !item.isRead ? 'font-semibold' : 'font-normal'
              }`}
            >
              {item.payload.message}
            </AppText>
            <AppText
              className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {dayjs(item.timestamp).format('MM월 DD일 HH:mm')}
            </AppText>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleDeleteNotification(item.id)}
          className='p-2'
        >
          <EvilIcons
            name='close'
            size={16}
            color={isDark ? '#9CA3AF' : '#6B7280'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
          {unreadCount > 0 && (
            <View className='bg-red-500 rounded-full px-2 py-1 min-w-[20px] items-center'>
              <AppText className='text-white text-xs font-bold'>
                {unreadCount > 99 ? '99+' : unreadCount}
              </AppText>
            </View>
          )}
        </View>
        <View className='flex-row gap-2'>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={handleMarkAllAsRead}>
              <AppText
                className={`text-sm ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                모두 읽음
              </AppText>
            </TouchableOpacity>
          )}
          {notifications.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <AppText
                className={`text-sm ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}
              >
                모두 삭제
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 알림 목록 */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                // 새로고침 로직 (필요시 추가)
              }}
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
