import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1440px]',
    full: 'max-w-none',
  };

  return (
    <div className={cn('mx-auto w-full px-6', sizes[size], className)}>
      {children}
    </div>
  );
}
