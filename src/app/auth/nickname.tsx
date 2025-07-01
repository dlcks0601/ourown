import { AppText } from '@/components/AppText';
import SetInput from '@/components/SetInput';
import { useSetNicknameMutation } from '@/hooks/query/user.query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, EvilIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NicknameScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [nickname, setNickname] = useState('');
  const { setNickname: setNicknameMutation } = useSetNicknameMutation();
  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex-1 items-center mt-4'>
          {/* 헤더 */}
          <View className='flex-row justify-between items-center w-full px-4 relative'>
            {/* 뒤로가기 */}
            <TouchableOpacity
              onPress={() => router.back()}
              className='absolute right-4'
            >
              <EvilIcons
                name='close'
                size={32}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
            {/* 로고 */}
            <View className='flex-col w-full items-center'>
              <View className='flex-col'>
                <AppText className='text-2xl font-logo'>Our</AppText>
                <AppText className='text-2xl font-logo mt-[-12px]'>Own</AppText>
              </View>
            </View>
          </View>

          <View className='flex-col mt-12 items-center'>
            <View className='flex-col items-center gap-3'>
              <Text
                className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
              >
                사용할 닉네임을 입력하세요
              </Text>
              <Text
                className={`text-md ${
                  isDark ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                상대방이 불러주는 애칭도 좋아요
              </Text>
            </View>
          </View>
          <View className='flex-col justify-center items-center px-4 mt-14'>
            {/* <TextInput
              value={nickname}
              onChangeText={setNickname}
              className={`w-full h-20 px-4 text-xl ${
                isDark ? 'text-white' : 'text-black'
              }`}
              placeholderTextColor={isDark ? '#9c9c9c' : '#919191'}
              placeholder='닉네임을 입력해주세요'
              style={{
                textAlignVertical: 'top',
                fontSize: 20,
                fontWeight: 'light',
              }}
            /> */}
            <SetInput
              value={nickname}
              onChangeText={setNickname}
              placeholder='닉네임을 입력해주세요'
            />
          </View>
          <TouchableOpacity
            className='absolute bottom-5 right-5'
            onPress={() => {
              if (nickname.trim()) {
                setNickname(nickname);
                setNicknameMutation(nickname);
                router.replace('/auth/couplewaitcode');
              }
            }}
            disabled={!nickname.trim()}
          >
            <Entypo
              name='chevron-thin-right'
              size={24}
              color={nickname.trim() ? (isDark ? 'white' : 'black') : '#919191'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
