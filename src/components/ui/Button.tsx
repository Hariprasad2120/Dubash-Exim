import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'submit';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-fixed shadow-sm px-space-lg py-3.5 rounded font-label-ui text-label-ui',
    secondary:
      'bg-primary-container text-on-primary hover:bg-inverse-surface shadow-sm px-space-lg py-3.5 rounded font-label-ui text-label-ui',
    dark:
      'bg-primary text-on-primary hover:bg-on-surface-variant shadow-sm px-space-md py-2.5 rounded text-label-ui font-label-ui',
    outline:
      'border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low px-space-md py-2.5 rounded text-label-ui font-label-ui',
    submit:
      'w-full py-4 px-space-lg rounded bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-fixed font-headline-sm text-headline-sm uppercase tracking-wide font-bold shadow-md',
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};
