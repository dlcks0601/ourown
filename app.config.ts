import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'ourown',
  slug: 'ourown',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'ourown',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.ourown',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    package: 'com.ourown',
  },
  web: {
    bundler: 'metro',
    output: 'server',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-secure-store',
    [
      'expo-build-properties',
      {
        android: {
          extraMavenRepos: [
            'https://devrepo.kakao.com/nexus/content/groups/public/',
          ],
          newArchEnable: true,
        },
        ios: {
          newArchEnable: true,
        },
      },
    ],
    [
      '@react-native-kakao/core',
      {
        nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
        android: {
          authCodeHandlerActivity: true,
        },
        ios: {
          handleKakaoOpenUrl: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    EXPO_PUBLIC_BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
    EXPO_PUBLIC_SCHEME: process.env.EXPO_PUBLIC_SCHEME,
    KAKAO_NATIVE_APP_KEY: process.env.KAKAO_NATIVE_APP_KEY,
  },
});
