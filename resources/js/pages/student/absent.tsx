import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFY, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Absent } from '@/types/absent';
import { Academicyear } from '@/types/academicyear';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC } from 'react';

type Props = {
  absents: Absent[];
  student: Student;
};

const StudentAbsentPage: FC<Props> = ({ absents, student }) => {
  const {
    academicYears = [],
    reasonLists = [],
    activeAcademicYear,
  } = usePage<SharedData & { academicYears: Academicyear[]; reasonLists: string[] }>().props;

  const { data, setData, reset } = useForm({
    academic_year_id: activeAcademicYear?.id ?? '',
    reason: '',
  });

  return (
    <AppLayout
      title={`Ketidakhadiran ${student.name}`}
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
            <FormControl label="Tahun ajaran">
              <Select value={data.academic_year_id.toString()} onValueChange={(value) => setData('academic_year_id', Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih tahun ajaran'} />
                </SelectTrigger>
                <SelectContent>
                  {academicYears.map((academic_year) => (
                    <SelectItem value={academic_year.id.toString()} key={academic_year.id}>
                      {academic_year.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Alasan ketidakhadiran">
              <Select value={data.reason} onValueChange={(value) => setData('reason', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih alasan'} />
                </SelectTrigger>
                <SelectContent>
                  {reasonLists.map((jenis) => (
                    <SelectItem value={jenis} key={jenis}>
                      {jenis}
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
            <Button variant={'destructive'} onClick={() => reset()} disabled={!data.academic_year_id && !data.reason}>
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
            <TableHead>Tanggal</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Alasan</TableHead>
            <TableHead>Deskripsi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {absents
            .filter((ay) => (data.academic_year_id ? data.academic_year_id.toString() === ay.academic_year_id.toString() : true))
            .filter((r) => (data.reason ? data.reason.toString() === r.reason.toString() : true))
            .map((absent, index) => (
              <TableRow key={absent.id}>
                <TableCell className="w-fit text-center">
                  <Button size={'icon'} variant={'ghost'} disabled>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{absent.academic_year.year}</TableCell>
                <TableCell>{dateDFY(absent.date)}</TableCell>
                <TableCell>{absent.student?.name}</TableCell>
                <TableCell>{absent.reason}</TableCell>
                <TableCell>{strLimit(absent.description)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default StudentAbsentPage;
