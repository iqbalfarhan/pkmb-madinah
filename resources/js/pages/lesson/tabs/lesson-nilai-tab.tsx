import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import AssignmentFormSheet from '@/pages/assignment/components/assignment-form-sheet';
import ScoreFormPopup from '@/pages/score/components/score-form-popover';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Lesson } from '@/types/lesson';
import { Score } from '@/types/score';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';

const LessonNilaiTab = () => {
  const {
    lesson,
    students = [],
    scores = [],
    assignments = [],
  } = usePage<SharedData & { lesson: Lesson; students: Student[]; scores: Score[]; assignments: Assignment[] }>().props;

  const totalRate = assignments.reduce((acc, curr) => acc + curr.rate, 0);
  const isRateFix = totalRate === 100;

  return (
    <div className="space-y-6">
      <HeadingSmall title="Daftar Nilai" description="Daftar nilai siswa untuk setiap tugas" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r-2 border-border">Nama siswa</TableHead>
            {assignments.map((assignment) => (
              <TableHead className="text-center" key={assignment.id}>
                <AssignmentFormSheet purpose="edit" assignment={assignment}>
                  <Button size={'icon'} variant={'ghost'}>
                    {assignment.rate}%
                  </Button>
                </AssignmentFormSheet>
              </TableHead>
            ))}
            <TableHead
              className={cn(
                'border-l-2 border-border text-center',
                isRateFix ? 'bg-success/10 text-center text-success' : 'bg-destructive/10 text-center text-destructive',
              )}
            >
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            let ratedScore = 0;
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
                {assignments.map((assignment) => {
                  const nilai = scores.find((score) => score.assignment_id === assignment.id && score.student_id === student.id);
                  ratedScore += nilai?.rated_score ?? 0;
                  return (
                    <TableCell key={assignment.id} className="w-fit text-center">
                      <ScoreFormPopup score={nilai} options={{ student_id: student.id, lesson_id: lesson.id, assignment_id: assignment.id }} />
                    </TableCell>
                  );
                })}
                <TableCell className="w-fit border-l-2 border-border text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    {Math.round(ratedScore)}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LessonNilaiTab;
