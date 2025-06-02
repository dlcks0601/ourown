import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../context/auth';

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
