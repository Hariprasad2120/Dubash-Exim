import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, required, className = '', ...props }, ref) => {
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
        <select
          id={id}
          ref={ref}
          required={required}
          className={`w-full min-w-0 box-border px-3.5 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all ${
            error ? 'border border-error ring-1 ring-error' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-error text-body-sm mt-1">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
