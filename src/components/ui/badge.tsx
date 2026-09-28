import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-brand-100 text-brand-700',
        navy: 'bg-navy-800 text-white',
        orange: 'bg-orange-100 text-orange-700',
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
        outline: 'border border-gray-300 text-gray-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
export { badgeVariants };
