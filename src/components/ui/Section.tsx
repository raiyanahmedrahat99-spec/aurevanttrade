import { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({ children, className, id, spacing = 'lg' }: SectionProps) {
  const spacings = {
    none: 'py-0',
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-32',
    xl: 'py-48',
  };

  return (
    <section id={id} className={cn(spacings[spacing], className)}>
      {children}
    </section>
  );
}
