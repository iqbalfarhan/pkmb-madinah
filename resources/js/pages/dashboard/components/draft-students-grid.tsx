import HeadingSmall from '@/components/heading-small';
import PpdbItemCard from '@/pages/ppdb/components/ppdb-item-card';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';

const DraftStudentsGrid = () => {
  const { students = [] } = usePage<{ students: Student[] }>().props;

  if (students.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <HeadingSmall title="Lanjut pendaftaran siswa" description="lanjutkan mengisi keterangan peserta didik baru" />
      <div className="grid-responsive gap-6">
        {students.map((student) => (
          <PpdbItemCard ppdb={student} key={student.id} href={route(student.status == 'draft' ? 'ppdb.edit' : 'ppdb.show', student.id)} />
        ))}
      </div>
    </div>
  );
};

export default DraftStudentsGrid;
