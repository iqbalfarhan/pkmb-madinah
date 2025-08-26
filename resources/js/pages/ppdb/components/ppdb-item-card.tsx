import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { numberPad } from '@/lib/utils';
import StudentStatusBadge from '@/pages/student/components/student-status-badge';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  ppdb: Student;
  href?: string;
};

const PpdbItemCard: FC<Props> = ({ ppdb, href }) => {
  return (
    <Link href={href ? href : route('ppdb.show', ppdb.id)}>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{ppdb.name}</CardTitle>
          <CardDescription>Kode pendaftaran: {numberPad(ppdb.id)}</CardDescription>
        </CardHeader>
        <CardFooter>
          <StudentStatusBadge status={ppdb.status} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PpdbItemCard;
