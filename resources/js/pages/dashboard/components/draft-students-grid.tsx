import HeadingSmall from '@/components/heading-small';
import PpdbItemCard from '@/pages/ppdb/components/ppdb-item-card';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';

const DraftStudentsGrid = () => {
  const { students = [], settings } = usePage<SharedData & { students: Student[] }>().props;

  if (students.length === 0) return null;
  if (settings?.PPDB_OPEN === 'false') return null;

  return (
    <div className="space-y-6">
      <HeadingSmall title="Lanjut pendaftaran siswa" description="lanjutkan mengisi keterangan peserta didik baru" />
      <div className="grid-responsive grid gap-6">
        {students.map((student) => (
          <PpdbItemCard ppdb={student} key={student.id} href={route(student.status == 'draft' ? 'ppdb.edit' : 'ppdb.show', student.id)} />
        ))}
      </div>
    </div>
  );
};

export default DraftStudentsGrid;
