import { useColorScheme } from '@/hooks/useColorScheme';
import { cn } from '@/utils/cn';
import { Text } from 'react-native';

type AppTextProps = {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'heading';
  bold?: boolean;
  color?: 'primary' | 'secondary' | 'tertiary';
  center?: boolean;
  logo?: boolean;
  className?: string;
};

export function AppText({
  children,
  size = 'medium',
  bold = false,
  color = 'primary',
  center = false,
  logo = false,
  className,
}: AppTextProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Text
      className={cn(
        size === 'small' && 'text-sm',
        size === 'medium' && 'text-base',
        size === 'large' && 'text-lg',
        size === 'heading' && 'text-xl',
        bold && 'font-bold',
        color === 'primary' && (isDark ? 'text-white' : 'text-black'),
        color === 'secondary' && (isDark ? 'text-gray-400' : 'text-gray-500'),
        color === 'tertiary' && (isDark ? 'text-gray-500' : 'text-gray-400'),
        center && 'text-center',
        logo && 'font-logo',
        className
      )}
    >
      {children}
    </Text>
  );
}
