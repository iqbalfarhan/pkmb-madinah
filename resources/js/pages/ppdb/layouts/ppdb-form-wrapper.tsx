import HeadingSmall from '@/components/heading-small';
import { FC, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren & {
  title?: string;
  description?: string;
  info?: ReactNode;
};

const PpdbFormWrapper: FC<Props> = ({ children, title = 'Title', description = 'Hint and description', info }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6">
        <HeadingSmall title={title} description={description} />
        {info}
      </div>
      <div className="space-y-6 md:col-span-2">{children}</div>
    </div>
  );
};

export default PpdbFormWrapper;
