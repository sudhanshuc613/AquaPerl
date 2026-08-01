'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-cta-orange text-white shadow-sm hover:bg-orange-600 hover:shadow-md',
        primary: 'bg-brand-500 text-white shadow-sm hover:bg-brand-600',
        navy:    'bg-navy-800 text-white shadow-sm hover:bg-navy-900',
        outline: 'border-2 border-brand-500 bg-white text-brand-600 hover:bg-brand-50',
        ghost:   'text-navy-800 hover:bg-brand-50 hover:text-brand-600',
        whatsapp:'bg-[#25D366] text-white hover:bg-[#1fb855]',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        link:    'text-brand-600 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';
export { buttonVariants };
