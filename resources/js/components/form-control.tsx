import { cn } from '@/lib/utils';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Label } from './ui/label';

type Props = PropsWithChildren & {
  label?: string;
  hint?: string;
  className?: string;
  required?: boolean;
  action?: ReactNode;
  asDiv?: boolean;
};

const FormControl: FC<Props> = ({ className, asDiv = false, ...other }) => {
  if (asDiv) {
    return (
      <div className={cn('flex flex-col space-y-2', className)}>
        <FormControlContent {...other} />
      </div>
    );
  }

  return (
    <Label className={cn('flex flex-col space-y-2', className)}>
      <FormControlContent {...other} />
    </Label>
  );
};

const FormControlContent: FC<Props> = ({ label, required, action, children, hint }) => {
  return (
    <>
      {label && (
        <div className="flex items-end justify-between text-sm">
          <label>
            {label} {required && <span className="text-destructive">*</span>}
          </label>
          {action}
        </div>
      )}
      {children}
      {hint && <p className="flex gap-1 text-xs text-muted-foreground">{hint}</p>}
    </>
  );
};

export default FormControl;
