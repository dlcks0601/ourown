import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TodoWidget() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();

  // ✅ 여러 개 선택할 수 있게 배열로 변경
  const [selected, setSelected] = useState<string[]>([]);

  // ✅ 선택 토글 핸들러
  const toggleSelect = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <View className='flex-row justify-between w-full gap-4'>
      {[1, 2].map((item) => (
        <View
          key={item}
          className={`flex-1 aspect-square ${
            isDark ? 'bg-gray-400' : 'bg-black'
          } rounded-2xl p-4`}
        >
          <View className='flex-row justify-between items-center mb-4'>
            <Text className='text-red-500 font-bold text-xl'>
              {user.nickname}
            </Text>
            <Text className='text-white font-bold text-2xl'>2</Text>
          </View>

          {/* todo item */}
          <View className='flex-col'>
            {['동현', '작업'].map((label) => {
              const key = `${item}-${label}`;
              const isSelected = selected.includes(key);

              return (
                <TouchableOpacity
                  key={label}
                  className='flex-row items-center my-2'
                  onPress={() => toggleSelect(key)}
                >
                  <View
                    className={`w-6 h-6 rounded-full border-2 mr-3 ${
                      isSelected
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-400'
                    }`}
                  />
                  <Text
                    className={`text-lg ${
                      isSelected ? 'text-gray-500 font-bold' : 'text-white'
                    }`}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
