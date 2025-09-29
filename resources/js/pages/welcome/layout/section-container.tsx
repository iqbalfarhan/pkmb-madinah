import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  title?: string;
  description?: string;
  className?: string;
};

const SectionContainer: FC<Props> = ({ children, title, description, className }) => {
  return (
    <div className={cn('mx-auto w-full max-w-6xl space-y-18 px-6 py-20 text-lg', className)}>
      {(title || description) && (
        <div className="flex flex-col items-center space-y-1.5 text-center">
          {title && <h1 className="text-4xl font-bold text-primary lg:text-6xl">{title}</h1>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default SectionContainer;
