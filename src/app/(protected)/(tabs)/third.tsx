import { useState } from 'react';
import { Text, View } from 'react-native';

export default function ThirdScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>안녕 </Text>
    </View>
  );
}
