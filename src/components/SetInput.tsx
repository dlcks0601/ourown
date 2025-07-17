import { TextInput, useColorScheme, View } from 'react-native';

interface SetInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string; // optional
  maxLength?: number;
}

export default function SetInput({
  value,
  onChangeText,
  placeholder = '내용을 입력해주세요.', // 기본값 지정
  maxLength,
}: SetInputProps) {
  const isDark = useColorScheme() === 'dark';

  return (
    <View className='flex-col w-full'>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#999' : '#ccc'}
        maxLength={maxLength}
        style={{
          color: isDark ? '#ffffff' : '#000000',
          fontSize: 16,
          height: 20,
        }}
      />
    </View>
  );
}
