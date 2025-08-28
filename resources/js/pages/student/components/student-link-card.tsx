import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { router } from '@inertiajs/react';
import { Book, LucideIcon } from 'lucide-react';
import { FC } from 'react';

type Props = {
  href?: string;
  title?: string;
  description?: string;
  show?: boolean;
  icon?: LucideIcon;
};

const StudentLinkCard: FC<Props> = ({ href, title = 'Card link title', description = 'Description', show = true, icon: Icon }) => {
  if (show == false) return null;

  const handleClick = () => {
    router.visit(href || '');
  };
  return (
    <Card onClick={handleClick}>
      <CardHeader className="flex flex-row space-y-5 space-x-4">
        <div className="size-5">{Icon ? <Icon /> : <Book />}</div>
        <div className="space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default StudentLinkCard;
