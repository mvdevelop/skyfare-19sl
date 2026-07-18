import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button';

const DropdownMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('relative inline-block text-left', className)} {...props}>
      {children}
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
}>(({ className, asChild = false, ...props }, ref) => {
  if (asChild) {
    return <span ref={ref} className={className} {...props} />;
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}>(
  ({ className, align = 'start', side = 'bottom', sideOffset = 0, ...props }, ref) => {
    const alignmentClasses = {
      start: 'left-0',
      center: 'left-1/2 transform -translate-x-1/2',
      end: 'right-0',
    };

    const sideOffsetClasses = {
      start: 'top-full mt-1',
      center: 'top-full mt-1',
      end: 'top-full mt-1',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'absolute z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md',
          alignmentClasses[align],
          sideOffsetClasses[side],
          className
        )}
        {...props}
      />
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};