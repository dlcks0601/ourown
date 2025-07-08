import { AppText } from '@/components/AppText';
import SetInput from '@/components/SetInput';
import { useSetNicknameMutation } from '@/hooks/query/user.query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SimpleLineIcons } from '@expo/vector-icons';
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

export default function NicknameSettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [nickname, setNickname] = useState('');
  const { setNickname: setNicknameMutation } = useSetNicknameMutation();
  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex-1 justify-between px-4'>
          <View className='flex-1 items-center mt-4'>
            {/* 헤더 */}
            <View className='flex-row items-center w-full'>
              {/* 뒤로가기 */}
              <TouchableOpacity
                onPress={() => router.back()}
                className='absolute'
              >
                <SimpleLineIcons
                  name='arrow-left'
                  size={18}
                  color={isDark ? 'white' : 'black'}
                />
              </TouchableOpacity>
              {/* 로고 */}
              <View className='flex-col w-full items-center'>
                <View className='flex-col'>
                  <AppText className='text-2xl font-logo'>Our</AppText>
                  <AppText className='text-2xl font-logo mt-[-12px]'>
                    Own
                  </AppText>
                </View>
              </View>
              {/* 헤더 끝 */}
            </View>
            <View className='flex-col mt-12 items-center'>
              <View className='flex-col items-center gap-3'>
                <Text
                  className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
                >
                  사용할 닉네임을 입력하세요
                </Text>
              </View>
            </View>
            <View className='flex-col justify-center items-center px-4 mt-14'>
              <SetInput
                value={nickname}
                onChangeText={setNickname}
                placeholder='닉네임을 입력해주세요'
              />
            </View>
            <TouchableOpacity
              className='bg-[#E2CBA5] rounded-md p-4 w-full absolute bottom-4'
              onPress={() => {
                if (nickname.trim()) {
                  setNickname(nickname);
                  setNicknameMutation(nickname);
                  router.back();
                }
              }}
              disabled={!nickname.trim()}
            >
              <AppText className='text-center text-black text-lg'>완료</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
