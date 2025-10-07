import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { safeAverage } from '@/lib/utils';
import ExamDeleteDialog from '@/pages/exam/components/exam-delete-dialog';
import ExamFormSheet from '@/pages/exam/components/exam-form-sheet';
import ExamscoreFormPopup from '@/pages/examscore/components/examscore-form-popup';
import { SharedData } from '@/types';
import { Exam } from '@/types/exam';
import { Examscore } from '@/types/examscore';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

const LessonUjianTab = () => {
  const {
    lesson,
    students = [],
    exams = [],
    examscores = [],
    permissions,
  } = usePage<SharedData & { lesson: Lesson; students: Student[]; exams: Exam[]; examscores: Examscore[] }>().props;

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Daftar Nilai"
        description="Daftar nilai siswa untuk setiap tugas"
        actions={
          <>
            {permissions?.canAdd && (
              <ExamFormSheet purpose="create" lessonId={lesson.id}>
                <Button>
                  <Plus />
                  Tambah evaluasi baru
                </Button>
              </ExamFormSheet>
            )}
          </>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2 border-border">Nama siswa</TableHead>
            {exams.map((ex, index) => (
              <TableHead className="text-center">
                <ExamFormSheet purpose="edit" exam={ex} lessonId={lesson.id}>
                  <Button variant={'ghost'} size={'icon'}>
                    E{index + 1}
                  </Button>
                </ExamFormSheet>
              </TableHead>
            ))}
            <TableHead className="border-l-2 border-border text-center">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => {
            const studentScores = examscores.filter((examscore) => examscore.student_id === student.id);

            // let studentAvgScore = 0;

            // if (studentScores.length > 0) {
            //   const total = studentScores.reduce((sum, s) => sum + Number(s.score), 0);
            //   studentAvgScore = total / studentScores.length;
            // }

            const totalAvg = safeAverage(studentScores, (s) => Number(s.score));

            return (
              <TableRow key={index}>
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
                    <TableCell className="text-center">
                      <ExamscoreFormPopup examscore={score} options={{ student_id: student.id, lesson_id: lesson.id, exam_id: ex.id }} />
                    </TableCell>
                  );
                })}
                <TableCell className="w-fit border-l-2 border-border text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    {totalAvg.toFixed(2)}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell />
            {exams.map((ex) => {
              return (
                <TableCell className="text-center">
                  {permissions?.canDelete && (
                    <ExamDeleteDialog exam={ex}>
                      <Button className="text-destructive" variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ExamDeleteDialog>
                  )}
                </TableCell>
              );
            })}
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonUjianTab;
