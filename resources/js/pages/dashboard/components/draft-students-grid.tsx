import HeadingSmall from '@/components/heading-small';
import StudentItemCard from '@/pages/student/components/student-item-card';
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
      <div className="grid grid-cols-4 gap-6">
        {students.map((student) => (
          <StudentItemCard student={student} key={student.id} href={route('ppdb.edit', student.id)} />
        ))}
      </div>
    </div>
  );
};

export default DraftStudentsGrid;
