import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  neonBorder?: 'pink' | 'cyan' | 'none';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, neonBorder = 'none', children, ...props }, ref) => {
    const borderColors = {
      pink: 'hover:border-neon-pink',
      cyan: 'hover:border-neon-cyan',
      none: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'glass rounded-lg p-6',
          hover && 'glass-hover cursor-pointer transform hover:scale-105 transition-all duration-300',
          neonBorder !== 'none' && borderColors[neonBorder],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
