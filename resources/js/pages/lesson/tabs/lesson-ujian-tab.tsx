import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { strLimit } from '@/lib/utils';
import ExamFormSheet from '@/pages/exam/components/exam-form-sheet';
import ExamscoreFormPopup from '@/pages/examscore/components/examscore-form-popup';
import { SharedData } from '@/types';
import { Exam } from '@/types/exam';
import { Examscore } from '@/types/examscore';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const LessonUjianTab = () => {
  const {
    lesson,
    students = [],
    exams = [],
    examscores,
  } = usePage<SharedData & { lesson: Lesson; students: Student[]; exams: Exam[]; examscores: Examscore[] }>().props;

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Daftar Nilai"
        description="Daftar nilai siswa untuk setiap tugas"
        actions={
          <>
            <ExamFormSheet purpose="create" lessonId={lesson.id}>
              <Button>
                <Plus />
                Tambah ujian baru
              </Button>
            </ExamFormSheet>
          </>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2 border-border">Nama siswa</TableHead>
            {exams.map((ex) => (
              <TableHead className="border-l-2 border-border text-center">
                <ExamFormSheet purpose="edit" exam={ex} lessonId={lesson.id}>
                  <div>{strLimit(ex.name, 10)}</div>
                </ExamFormSheet>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell className="border-r-2 border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={student.avatar} />
                    </Avatar>
                    <span>{student.name}</span>
                  </div>
                </TableCell>
                {exams.map((ex) => {
                  const score = examscores.find((es) => es.student_id == student.id && es.exam_id === ex.id);
                  return (
                    <TableCell className="w-fit border-l-2 border-border text-center">
                      <ExamscoreFormPopup examscore={score} options={{ student_id: student.id, lesson_id: lesson.id, exam_id: ex.id }} />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonUjianTab;
