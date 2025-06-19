import { TextInput, useColorScheme, View } from 'react-native';

interface CheckInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string; // optional
}

export default function CheckInput({
  value,
  onChangeText,
  placeholder = '내용을 입력해주세요.', // 기본값 지정
}: CheckInputProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='flex-col w-full'>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#999' : '#ccc'}
        style={{
          color: isDark ? '#ffffff' : '#000000',
          fontSize: 16,
          height: 20,
        }}
      />
    </View>
  );
}
