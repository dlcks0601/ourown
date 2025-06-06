import TestCalendar from '@/components/calendar/TestCalendar';
import { useState } from 'react';
import { View } from 'react-native';

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
      <TestCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
    </View>
  );
}
