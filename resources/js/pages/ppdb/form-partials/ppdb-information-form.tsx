import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Grade } from '@/types/grade';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import PpdbFormWrapper from '../layouts/ppdb-form-wrapper';

const PpdbInformationForm = () => {
  const { grades, student, permissions } = usePage<SharedData & { grades: Grade[]; student: Student }>().props;

  const { data, setData, put, processing } = useForm({
    grade_id: student?.grade_id ?? '',
    name: student?.name ?? '',
    gender: student?.gender ?? true,
    nisn: student?.nisn ?? '0',
    nis: student?.nis ?? '0',
    pob: student?.pob ?? '',
    dob: student?.dob ?? '',
  });

  const handleSubmit = () => {
    put(route('ppdb.update', student.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Data siswa berhasil disimpan'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <PpdbFormWrapper title="Informasi Siswa" description="Lengkapi informasi siswa baru. Apabila tidak memiliki NISN atau NIS, bisa diisi dengan 0">
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <FormControl label="Pendaftaran untuk tingkat" required>
              <Select value={data.grade_id.toString()} onValueChange={(value) => setData('grade_id', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tingkat" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id.toString()}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </CardContent>
        <Separator />
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <FormControl label="Nama lengkap" required>
              <Input placeholder="Nama lengkap siswa" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis kelamin" required>
              <Select value={data.gender ? '1' : '0'} onValueChange={(value) => setData('gender', value === '1' ? true : false)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Laki-laki</SelectItem>
                  <SelectItem value="0">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="NISN" required>
              <Input placeholder="NISN" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
            </FormControl>
            <FormControl label="NIS" required>
              <Input placeholder="NIS" value={data.nis} onChange={(e) => setData('nis', e.target.value)} />
            </FormControl>
            <FormControl label="Tempat lahir" required>
              <Input placeholder="Kota lahir" value={data.pob} onChange={(e) => setData('pob', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal lahir" required>
              <DatePicker
                value={data.dob ? dayjs(data.dob).toDate() : undefined}
                onValueChange={(value) => setData('dob', dayjs(value).format('YYYY-MM-DD'))}
              />
            </FormControl>
          </div>
        </CardContent>
        {permissions?.canUpdate && (
          <>
            <Separator />
            <CardFooter>
              <SubmitButton loading={processing} onClick={handleSubmit} />
            </CardFooter>
          </>
        )}
      </Card>
    </PpdbFormWrapper>
  );
};

export default PpdbInformationForm;
