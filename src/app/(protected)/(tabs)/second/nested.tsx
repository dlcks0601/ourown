import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Nested() {
  return (
    <View>
      <Text>하이</Text>
      <Link href='/second/also-nested' asChild>
        <Button title='AlsoNested' />
      </Link>
    </View>
  );
}
