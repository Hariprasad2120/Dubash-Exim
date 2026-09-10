import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, required, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col min-w-0">
        {label && (
          <label
            htmlFor={id}
            className="font-label-ui text-label-ui text-on-surface font-semibold uppercase mb-1.5"
          >
            {label} {required && '*'}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          required={required}
          className={`w-full min-w-0 box-border px-5 py-3 rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary transition-all ${
            error ? 'border border-error ring-1 ring-error' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-error text-body-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
