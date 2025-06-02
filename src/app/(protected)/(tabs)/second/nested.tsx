import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Nested() {
  return (
    <View>
      <Text>Nested</Text>
      <Link href='/second/also-nested' asChild>
        <Button title='AlsoNested' />
      </Link>
    </View>
  );
}
