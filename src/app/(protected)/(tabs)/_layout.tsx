import { useAuthStore } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, useColorScheme } from 'react-native';

export default function BottomTabsLayout() {
  const { user } = useAuthStore();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? 'white' : 'black',
        tabBarInactiveTintColor: isDark ? 'gray' : 'gray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? 'black' : 'white',
        },
      }}
      backBehavior='order'
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          headerShown: false,
          popToTopOnBlur: true,
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='bucket'
        options={{
          title: 'Bucket',
          headerShown: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='third'
        options={{
          title: 'Third',
          headerShown: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='journal-outline' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='mypage'
        options={{
          title: 'Mypage',
          headerShown: false,
          popToTopOnBlur: true,
          tabBarBadgeStyle: {
            backgroundColor: 'tomato',

            color: 'white',
          },
          tabBarIcon: () => (
            <Image
              source={{ uri: user.profileUrl }}
              className={`w-8 h-8 rounded-full border-[0.5px] border-gray-400`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
