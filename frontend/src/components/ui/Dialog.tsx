import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from './Button';

const Dialog = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>(({ className, open, onOpenChange, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open || false);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <div ref={ref} className={cn('relative z-50', className)} {...props}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { open: isOpen, onOpenChange: handleOpenChange });
        }
        return child;
      })}
    </div>
  );
});

Dialog.displayName = 'Dialog';

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
}>(({ className, asChild = false, ...props }, ref) => {
  if (asChild) {
    return <span ref={ref} className={className} {...props} />;
  }

  return (
    <Button
      ref={ref}
      variant="outline"
      className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', className)}
      {...props}
    />
  );
});

DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & {
  onOpenAutoFocus?: ((event: Event) => void) | undefined;
  onCloseAutoFocus?: ((event: Event) => void) | undefined;
  onEscapeKeyDown?: ((event: KeyboardEvent) => void) | undefined;
  onPointerDownOutside?: ((event: MouseEvent) } = { any } => void) | undefined;
  onInteractOutside?: ((event: Event) => void) | undefined;
  preventScroll?: boolean;
  preserveTabOrder?: boolean;
  forceMount?: boolean;
}>(
  ({
    className,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    preventScroll,
    preserveTabOrder,
    forceMount,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50',
          'flex items-center justify-center',
          'bg-black/50 backdrop-blur-sm',
          'p-4',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-half data-[state=open]:slide-in-from-top-half',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'relative w-full max-w-lg rounded-lg border bg-white shadow-lg',
            'duration-200 ease-in-out',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-half data-[state=open]:slide-in-from-top-half'
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }
);

DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-left p-6 pb-3', className)}
      {...props}
    />
  )
);

DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
);

DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', className)}
      {...props}
    />
  )
);

DialogFooter.displayName = 'DialogFooter';

const DialogClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
        'hover:bg-accent hover:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  )
);

DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
};