import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, TextInput, View } from 'react-native';

type AuthInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  required?: boolean;
  error?: string;
};

export default function AuthInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  required = false,
  error,
}: AuthInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className='mb-4'>
      <Text
        className={`mb-1 text-sm font-semibold ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        {label}
        {required && <Text className='text-primary'>*</Text>}
      </Text>
      <TextInput
        className={`w-full border rounded-md px-4 h-14 text-base${
          isDark
            ? 'bg-[#18181b] border-gray-600 text-white'
            : 'bg-white border-gray-300 text-black'
        }`}
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#a3a3a3' : '#a3a3a3'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize='none'
        keyboardType={keyboardType}
        style={{
          textAlignVertical: 'top',
        }}
      />
    </View>
  );
}
