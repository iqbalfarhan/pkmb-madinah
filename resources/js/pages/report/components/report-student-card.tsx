import { Card, CardContent } from '@/components/ui/card';
import { FC } from 'react';

type Props = {
  student_name: string;
  classroom_name: string;
  student_age: string;
  student_nisn: string;
};

const ReportStudentCard: FC<Props> = ({ student_name, classroom_name, student_age, student_nisn }) => {
  return (
    <Card>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">Nama siswa</dt>
            <dd className="w-2/3">{student_name}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Kelas</dt>
            <dd className="w-2/3">{classroom_name}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Usia</dt>
            <dd className="w-2/3">{student_age ?? ''}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">NIS/NISN</dt>
            <dd className="w-2/3">{student_nisn}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default ReportStudentCard;
