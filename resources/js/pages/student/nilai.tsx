import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { Assignment } from '@/types/assignment';
import { Lesson } from '@/types/lesson';
import { Score } from '@/types/score';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC } from 'react';

type Props = {
  student: Student;
  scores: Score[];
  query: { [key: string]: string };
};

const ScoreList: FC<Props> = ({ scores, student }) => {
  const { lessons = [], assignments = [] } = usePage<{ lessons: Lesson[]; assignments: Assignment[] }>().props;

  const { data, setData, reset } = useForm({
    lesson_id: '',
    assignment_id: '',
  });

  return (
    <AppLayout
      title={student.name}
      description="Kumpulan nilai tugas semua pelajaran"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <FormControl label="Pelajaran">
              <Select value={data.lesson_id} onValueChange={(value) => setData('lesson_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {lessons.map((lesson) => (
                    <SelectItem value={lesson.id.toString()} key={lesson.id}>
                      {lesson.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Judul tugas">
              <Select value={data.assignment_id} onValueChange={(value) => setData('assignment_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {assignments
                    .filter((tugas) => data.lesson_id && tugas.lesson_id.toString() === data.lesson_id.toString())
                    .map((tugas) => (
                      <SelectItem value={tugas.id.toString()} key={tugas.id}>
                        {tugas.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex gap-2">
            <Button variant={'destructive'} onClick={() => reset()} disabled={!data.lesson_id && !data.assignment_id}>
              <X />
              Reset pencarian
            </Button>
          </div>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead>Pelajaran</TableHead>
            <TableHead>Tugas</TableHead>
            <TableHead className="border-l text-center">Nilai</TableHead>
            <TableHead>Catatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores
            .filter((l) => (data.lesson_id ? data.lesson_id.toString() === l.lesson_id.toString() : true))
            .filter((a) => (data.assignment_id ? data.assignment_id.toString() === a.assignment_id.toString() : true))
            .map((score, index) => (
              <TableRow key={score.id}>
                <TableCell className="w-fit text-center">
                  <Button size={'icon'} variant={'ghost'} disabled>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{score.lesson.name}</TableCell>
                <TableCell>{score.assignment.name}</TableCell>
                <TableCell className="border-l text-center">{score.score}</TableCell>
                <TableCell>{strLimit(score.remark ?? '')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ScoreList;
