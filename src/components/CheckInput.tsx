import {
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface CheckInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export default function CheckInput({
  value,
  onChangeText,
  onSubmit,
}: CheckInputProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='flex-row items-center mb-2'>
      <TouchableOpacity
        activeOpacity={1}
        className={`w-6 h-6 border-2 mr-3 ${
          isDark ? 'border-gray-400' : 'border-gray-400'
        }  rounded-full `}
      />
      <TextInput
        placeholder='내용을 추가해보세요.'
        placeholderTextColor={isDark ? '#999' : '#ccc'}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType='done'
        style={{
          color: isDark ? '#ffffff' : '#000000',
          fontSize: 16,
          flex: 1,
        }}
      />
    </View>
  );
}
