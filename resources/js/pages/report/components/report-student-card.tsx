import { Card, CardContent } from '@/components/ui/card';
import { ReportDataMeta } from '@/types/report';
import { FC } from 'react';

type Props = {
  meta: ReportDataMeta;
};

const ReportStudentCard: FC<Props> = ({ meta }) => {
  return (
    <Card>
      <CardContent>
        <dl className="space-y-2">
          <div className="flex">
            <dt className="w-1/3">Nama siswa</dt>
            <dd className="w-2/3">{meta.nama}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Kelas</dt>
            <dd className="w-2/3">{meta.kelas}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">Usia</dt>
            <dd className="w-2/3">{meta.usia ?? ''}</dd>
          </div>
          <div className="flex">
            <dt className="w-1/3">NIS/NISN</dt>
            <dd className="w-2/3">{meta.nisn}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default ReportStudentCard;
