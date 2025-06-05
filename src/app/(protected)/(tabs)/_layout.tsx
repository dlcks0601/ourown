import { useAuthStore } from '@/store/authStore';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
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
          tabBarLabel: '홈',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='numeric-1-box-outline'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='second'
        options={{
          title: 'Second',
          headerShown: false,
          popToTopOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='numeric-2-box-outline'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='third'
        options={{
          title: 'Third',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='numeric-3-box-outline'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='mypage'
        options={{
          tabBarBadgeStyle: {
            backgroundColor: 'tomato',
            color: 'white',
          },
          title: 'Fourth',
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
