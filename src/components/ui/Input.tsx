import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefixElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefixElement, id, required, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={id}
            className="font-label-ui text-label-ui text-on-surface font-semibold uppercase mb-1.5 flex items-center justify-between"
          >
            <span>
              {label} {required && '*'}
            </span>
          </label>
        )}
        <div className="flex items-center gap-2">
          {prefixElement}
          <input
            id={id}
            ref={ref}
            required={required}
            className={`w-full px-3.5 py-3 rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all ${
              error ? 'border border-error ring-1 ring-error' : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-error text-body-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
