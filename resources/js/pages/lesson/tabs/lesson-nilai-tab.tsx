import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, safeAverage } from '@/lib/utils';
import AssignmentFormSheet from '@/pages/assignment/components/assignment-form-sheet';
import ScoreFormPopup from '@/pages/score/components/score-form-popover';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Lesson } from '@/types/lesson';
import { Score } from '@/types/score';
import { Student } from '@/types/student';
import { usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const LessonNilaiTab = () => {
  const {
    lesson,
    students = [],
    scores = [],
    assignments = [],
  } = usePage<SharedData & { lesson: Lesson; students: Student[]; scores: Score[]; assignments: Assignment[] }>().props;

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Daftar Nilai"
        description="Daftar nilai siswa untuk setiap tugas"
        actions={
          <>
            <AssignmentFormSheet purpose="create">
              <Button>
                <Plus />
                Tambah tugas baru
              </Button>
            </AssignmentFormSheet>
          </>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead rowSpan={2} className="border-r-2 border-border">
              Nama siswa
            </TableHead>
            <TableHead colSpan={assignments.filter((a) => a.type === 'jurnal').length} className="bg-yellow-300/10 text-center">
              Nilai jurnal
            </TableHead>
            <TableHead colSpan={assignments.filter((a) => a.type === 'prakarya').length} className="bg-green-300/10 text-center">
              Nilai prakarya
            </TableHead>
            <TableHead rowSpan={2} className={cn('border-l-2 border-border text-center')}>
              <Popover>
                <PopoverTrigger>
                  <div>Total</div>
                </PopoverTrigger>
                <PopoverContent>avg(jurnal) + avg(prakarya) / 2</PopoverContent>
              </Popover>
            </TableHead>
          </TableRow>
          <TableRow>
            {assignments
              .filter((jurnal) => jurnal.type === 'jurnal')
              .map((jurnal, index) => (
                <TableHead className="bg-yellow-500/10 text-center" key={jurnal.id}>
                  <AssignmentFormSheet purpose="edit" assignment={jurnal} type="jurnal">
                    <Button size={'icon'} variant={'ghost'}>
                      J{index + 1}
                    </Button>
                  </AssignmentFormSheet>
                </TableHead>
              ))}
            {assignments
              .filter((prakarya) => prakarya.type === 'prakarya')
              .map((prakarya, index) => (
                <TableHead className="bg-green-500/10 text-center" key={prakarya.id}>
                  <AssignmentFormSheet purpose="edit" assignment={prakarya} type={'prakarya'}>
                    <Button size={'icon'} variant={'ghost'}>
                      P{index + 1}
                    </Button>
                  </AssignmentFormSheet>
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const studentScores = scores.filter((score) => score.student_id === student.id);

            const jurnalScores = studentScores.filter((s) => s.assignment.type === 'jurnal');
            const avgJurnal = safeAverage(jurnalScores, (s) => Number(s.score));

            const prakaryaScores = studentScores.filter((s) => s.assignment.type === 'prakarya');
            const avgPrakarya = safeAverage(prakaryaScores, (s) => Number(s.score));

            const totalAvg = safeAverage([avgJurnal, avgPrakarya], (s) => s);

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
                {assignments
                  .filter((assignment) => assignment.type === 'jurnal')
                  .map((assignment) => {
                    const nilai = scores.find((score) => score.assignment_id === assignment.id && score.student_id === student.id);
                    // ratedScore += nilai?.rated_score ?? 0;
                    return (
                      <TableCell key={assignment.id} className="w-fit bg-yellow-700/10 text-center">
                        <ScoreFormPopup score={nilai} options={{ student_id: student.id, lesson_id: lesson.id, assignment_id: assignment.id }} />
                      </TableCell>
                    );
                  })}
                {assignments.filter((assignment) => assignment.type === 'jurnal').length === 0 && (
                  <TableCell className="w-fit bg-yellow-700/10 text-center">-</TableCell>
                )}
                {assignments
                  .filter((assignment) => assignment.type === 'prakarya')
                  .map((assignment) => {
                    const nilai = scores.find((score) => score.assignment_id === assignment.id && score.student_id === student.id);
                    // ratedScore += nilai?.rated_score ?? 0;
                    return (
                      <TableCell key={assignment.id} className="w-fit bg-green-700/10 text-center">
                        <ScoreFormPopup score={nilai} options={{ student_id: student.id, lesson_id: lesson.id, assignment_id: assignment.id }} />
                      </TableCell>
                    );
                  })}
                {assignments.filter((assignment) => assignment.type === 'prakarya').length === 0 && (
                  <TableCell className="w-fit bg-green-700/10 text-center">-</TableCell>
                )}
                <TableCell className="w-fit border-l-2 border-border text-center">
                  <Button variant={'ghost'} size={'icon'}>
                    {/* {Math.round(ratedScore)} */}
                    {/* {Math.round(studentAvgScore)} */}
                    {totalAvg.toFixed(2)}
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
