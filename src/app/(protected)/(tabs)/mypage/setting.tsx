import { AppText } from '@/components/AppText';
import { useAuthStore } from '@/store/authStore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ActionSheetIOS,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, partner, couple } = useAuthStore();
  const formattedAnniv = couple.anniversary.slice(0, 10).replace(/-/g, '.');

  const handleUserPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['프로필 이미지', '닉네임', '생년월일', '취소'],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 3,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          router.push('/mypage/profile-setting');
        } else if (buttonIndex === 1) {
          router.push('/mypage/nickname-setting');
        } else if (buttonIndex === 2) {
          router.push('/mypage/birthday-setting');
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
          Couple Setting
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-col mt-10 gap-10'>
          <View className='flex-row items-center px-4 w-full'>
            <TouchableOpacity
              onPress={() => router.push('/mypage/start-setting')}
              className='flex-row items-center justify-between w-full pr-8'
            >
              <AppText className='font-logo text-xl'>Our Start</AppText>
              <AppText className='text-xl font-logo'>{formattedAnniv}</AppText>
            </TouchableOpacity>
            <SimpleLineIcons
              className='absolute right-4'
              name='arrow-right'
              size={12}
              color={isDark ? 'white' : 'black'}
            />
          </View>

          <TouchableOpacity
            className='flex-row items-center justify-between px-4'
            onPress={handleUserPress}
          >
            <View className='flex-col items-start gap-2'>
              <View className='flex-row items-center gap-4'>
                <Image
                  source={{ uri: user.profileUrl }}
                  className='w-10 h-10 rounded-full'
                />
                <View>
                  <AppText className='font-extralight text-xl'>
                    {user.nickname}
                  </AppText>
                  <AppText className='font-extralight text-xl'>
                    {user.birthday
                      ? user.birthday.slice(0, 10).replace(/-/g, '.')
                      : ''}
                  </AppText>
                </View>
              </View>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={12}
              color={isDark ? 'white' : 'black'}
            />
          </TouchableOpacity>

          <View className='flex-row items-center justify-between px-4'>
            <View className='flex-col items-start gap-2'>
              <View className='flex-row items-center gap-4'>
                <Image
                  source={{ uri: partner.profileUrl }}
                  className='w-10 h-10 rounded-full'
                />
                <View>
                  <AppText className='font-extralight text-xl'>
                    {partner.nickname}
                  </AppText>
                  <AppText className='font-extralight text-xl'>
                    {partner.birthday
                      ? partner.birthday.slice(0, 10).replace(/-/g, '.')
                      : ''}
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
