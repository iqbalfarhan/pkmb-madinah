import DatePicker from '@/components/date-picker';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { Grade } from '@/types/grade';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import PpdbFormWrapper from './layouts/ppdb-form-wrapper';

type Props = {
  grades: Grade[];
};

const CreatePpdbStudent: FC<Props> = ({ grades = [] }) => {
  const { data, setData, post } = useForm({
    grade_id: '',
    name: '',
    gender: '',
    nisn: '',
    nis: '',
    pob: '',
    dob: '',
    status: 'draft',
  });

  const handleSubmit = () => {
    post(route('ppdb.store'), {
      onSuccess: () => toast.success('Data siswa berhasil disimpan'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout title="Pendaftaran Siswa Baru" description="Form untuk menambah siswa baru">
      <PpdbFormWrapper title="Informasi Siswa" description="Lengkapi informasi siswa baru. Apabila tidak memiliki NISN atau NIS, bisa diisi dengan 0">
        <Card>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <FormControl label="Pendaftaran untuk tingkat" required>
                <Select value={data.grade_id} onValueChange={(value) => setData('grade_id', value)}>
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
            <div className="grid gap-6 md:grid-cols-2">
              <FormControl label="Nama lengkap" required>
                <Input placeholder="Nama lengkap siswa" value={data.name} onChange={(e) => setData('name', e.target.value)} />
              </FormControl>
              <FormControl label="Jenis kelamin" required>
                <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
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
                <Input type="number" placeholder="NISN" value={data.nisn} onChange={(e) => setData('nisn', e.target.value)} />
              </FormControl>
              <FormControl label="NIS" required>
                <Input type="number" placeholder="NIS" value={data.nis} onChange={(e) => setData('nis', e.target.value)} />
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
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Selanjutnya</CardTitle>
            <CardDescription>Mengisi data pendaftaran lainnya</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleSubmit}>
              Selanjutnya <ChevronRight />
            </Button>
          </CardFooter>
        </Card>
      </PpdbFormWrapper>
    </AppLayout>
  );
};

export default CreatePpdbStudent;
