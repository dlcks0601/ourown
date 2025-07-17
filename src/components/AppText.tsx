import { useColorScheme } from '@/hooks/useColorScheme';
import { cn } from '@/utils/cn';
import { Text } from 'react-native';

type AppTextProps = {
  children: React.ReactNode;
  color?: 'primary';
  center?: boolean;
  logo?: boolean;
  className?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
};

export function AppText({
  children,
  color = 'primary',
  center = false,
  logo = false,
  className,
  numberOfLines,
  ellipsizeMode,
}: AppTextProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Text
      className={cn(
        color === 'primary' && (isDark ? 'text-white' : 'text-black'),
        center && 'text-center',
        logo && 'font-logo',
        className
      )}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
}
