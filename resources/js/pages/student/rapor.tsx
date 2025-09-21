import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { strLimit } from '@/lib/utils';
import { Academicyear } from '@/types/academicyear';
import { Classroom } from '@/types/classroom';
import { Report } from '@/types/report';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { Download, X } from 'lucide-react';
import { FC } from 'react';

type Props = {
  student: Student;
  reports: Report[];
  query: { [key: string]: string };
};

const StudentRaporPage: FC<Props> = ({ reports, student }) => {
  const {
    academicYears = [],
    reportTypes = [],
    classrooms = [],
  } = usePage<{ academicYears: Academicyear[]; reportTypes: string[]; classrooms: Classroom[] }>().props;

  const { data, setData, reset } = useForm({
    academic_year_id: '',
    report_type: '',
    classroom_id: '',
  });

  return (
    <AppLayout
      title={`Rapor ${student.name}`}
      description="Kumpulan nilai jenis semua pelajaran"
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
              <Select value={data.academic_year_id} onValueChange={(value) => setData('academic_year_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academic_year) => (
                    <SelectItem value={academic_year.id.toString()} key={academic_year.id}>
                      {academic_year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Judul jenis">
              <Select value={data.report_type} onValueChange={(value) => setData('report_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((jenis) => (
                    <SelectItem value={jenis} key={jenis}>
                      {jenis}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.classroom_id} onValueChange={(value) => setData('classroom_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih pelajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((kelas) => (
                    <SelectItem value={kelas.id.toString()} key={kelas.id}>
                      {kelas.name}
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
            <Button variant={'destructive'} onClick={() => reset()} disabled={!data.academic_year_id && !data.report_type}>
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
            <TableHead>Tahun ajaran</TableHead>
            <TableHead>Jenis rapor</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Nama file</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports
            .filter((l) => (data.academic_year_id ? data.academic_year_id.toString() === l.academic_year_id.toString() : true))
            .filter((c) => (data.classroom_id ? data.classroom_id.toString() === c.classroom_id.toString() : true))
            .filter((a) => (data.report_type ? data.report_type.toString() === a.report_type.toString() : true))
            .map((report, index) => (
              <TableRow key={report.id}>
                <TableCell className="w-fit text-center">
                  <Button size={'icon'} variant={'ghost'} disabled>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{report.academic_year.label}</TableCell>
                <TableCell>{report.report_type}</TableCell>
                <TableCell>{report.classroom.name}</TableCell>
                <TableCell>{strLimit(report.name)}</TableCell>
                <TableCell>
                  <Button size={'icon'} variant={'ghost'}>
                    <a href={route('report.download', report.id)}>
                      <Download />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default StudentRaporPage;
