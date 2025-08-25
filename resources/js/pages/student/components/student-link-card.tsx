import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  href?: string;
  title?: string;
  description?: string;
};

const StudentLinkCard: FC<Props> = ({ href, title = 'Card link title', description = 'Description' }) => {
  return (
    <Link href={href}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default StudentLinkCard;
