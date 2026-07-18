import React from 'react';
import { cn } from '@/lib/utils';

const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
}>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? '');

    const currentValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          orientation === 'horizontal' ? 'overflow-x-auto' : 'overflow-y-auto',
          className
        )}
        {...props}
      />
    );
  }
);

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLTabListElement, React.HTMLAttributes<HTMLTabListElement> & {
  orientation?: 'horizontal' | 'vertical';
}>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
          orientation === 'vertical'
            ? 'flex-col h-full w-full space-y-1'
            : 'flex-row',
          className
        )}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

const Tab = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  disabled?: boolean;
}>(({ className, value, disabled = false, ...props }, ref) => {
  const isSelected = window.location.hash === `#${value}`;

  React.useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.slice(1);
      if (currentHash === value) {
        // Trigger custom event for parent component
        window.dispatchEvent(new CustomEvent('tabChange', { detail: { value } }));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [value]);

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'data-[state=selected]:bg-background data-[state=selected]:text-foreground data-[state=selected]:shadow-sm',
        'hover:bg-background/50',
        className
      )}
      {...props}
    />
  );
});

Tab.displayName = 'Tab';

const TabPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  activeValue?: string;
}>(({ className, value, activeValue, ...props }, ref) => {
  if (value !== activeValue) return null;

  return (
    <div
      ref={ref}
      className={cn('mt-2', className)}
      {...props}
    />
  );
});

TabPanel.displayName = 'TabPanel';

export { Tabs, TabsList, Tab, TabPanel };