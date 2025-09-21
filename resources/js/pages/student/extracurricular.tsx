import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Academicyear } from '@/types/academicyear';
import { Activity } from '@/types/activity';
import { Extracurricular } from '@/types/extracurricular';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC } from 'react';

type Props = {
  activities: Activity[];
  student: Student;
};

const StudentExtracurricularPage: FC<Props> = ({ activities, student }) => {
  const { extracurriculars = [], academicYears = [] } = usePage<{ extracurriculars: Extracurricular[]; academicYears: Academicyear[] }>().props;
  const { data, setData, reset } = useForm({
    extracurricular_id: '',
    academic_year_id: '',
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
            <FormControl label="Academic year">
              <Select value={data.academic_year_id} onValueChange={(value) => setData('academic_year_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academicYear) => (
                    <SelectItem value={academicYear.id.toString()} key={academicYear.id}>
                      {academicYear?.label ?? ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Pelajaran">
              <Select value={data.extracurricular_id} onValueChange={(value) => setData('extracurricular_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {extracurriculars.map((extracurricular) => (
                    <SelectItem value={extracurricular.id.toString()} key={extracurricular.id}>
                      {extracurricular?.name ?? ''}
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
            <Button variant={'destructive'} onClick={() => reset()} disabled={!data.extracurricular_id && !data.academic_year_id}>
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
            <TableHead>Student</TableHead>
            <TableHead>Ekstrakulikuler</TableHead>
            <TableHead>Kegiatan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities
            .filter((ay) => (data.academic_year_id ? data.academic_year_id.toString() === ay.academic_year_id.toString() : true))
            .filter((l) => (data.extracurricular_id ? data.extracurricular_id.toString() === l.extracurricular_id.toString() : true))
            .map((activity, index) => (
              <TableRow key={activity.id}>
                <TableCell className="w-fit text-center">
                  <Button size={'icon'} variant={'ghost'} disabled>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{activity.student.name}</TableCell>
                <TableCell>{activity.extracurricular.name}</TableCell>
                <TableCell>{activity.description}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default StudentExtracurricularPage;
