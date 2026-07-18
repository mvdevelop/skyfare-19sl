import React from 'react';
import { cn } from '@/lib/utils';

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
}>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'bg-background text-foreground border',
    destructive:
      'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    warning:
      'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
    success:
      'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200',
    info:
      'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200',
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
);

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };