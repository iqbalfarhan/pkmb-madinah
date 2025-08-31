import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { numberPad } from '@/lib/utils';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import { FC } from 'react';
import StudentStatusBadge from './student-status-badge';

type Props = {
  student: Student;
  href?: string;
};

const StudentItemCard: FC<Props> = ({ student, href }) => {
  return (
    <Link href={href ? href : route('student.show', student.id)}>
      <Card className="flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{student.name}</CardTitle>
          <CardDescription>Kode pendaftaran: {numberPad(student.id)}</CardDescription>
        </CardHeader>
        <CardFooter>
          <StudentStatusBadge status={student.status} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default StudentItemCard;
