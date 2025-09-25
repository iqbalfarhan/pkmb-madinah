import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { Report, ReportDataMeta, ReportTahsinData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportTahsinData;
};

const ReportTahsin: FC<Props> = ({ data }) => {
  const { report, teachers = [] } = usePage<SharedData & { report: Report; teachers: User[] }>().props;
  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportTahsinData,
  });

  const handleUpdate = useCallback(() => {
    put(route('report.update', report.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rapor berhasil disimpan');
      },
      onError: (e) => toast.error(em(e)),
    });
  }, [put, report.id]);

  return (
    <>
      <ReportHeader />
      <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
        <Check />
        Simpan
      </Button>
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-80">Al-Muyassar/Jilid</TableHead>
                <TableCell>
                  <Input placeholder="angka" value={formData.data.jilid} onChange={(e) => setData('data.jilid', e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Hal</TableHead>
                <TableCell>
                  <Input placeholder="angka" value={formData.data.hal} onChange={(e) => setData('data.hal', e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Nilai KKM</TableHead>
                <TableCell>
                  <Input placeholder="angka" value={formData.data.nilai_kkm} onChange={(e) => setData('data.nilai_kkm', e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Nilai Raport</TableHead>
                <TableCell>
                  <Input placeholder="angka" value={formData.data.nilai_rapor} onChange={(e) => setData('data.nilai_rapor', e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Nilai Rentang</TableHead>
                <TableCell>
                  <Input placeholder="angka" value={formData.data.nilai_rentang} onChange={(e) => setData('data.nilai_rentang', e.target.value)} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Titik Kuat</TableHead>
                <TableCell>
                  <Textarea value={formData.data.titik_kuat} onChange={(e) => setData('data.titik_kuat', e.target.value)} className="h-24" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Titik Lemah</TableHead>
                <TableCell>
                  <Textarea value={formData.data.titik_lemah} onChange={(e) => setData('data.titik_lemah', e.target.value)} className="h-24" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-80">Komentar Guru</TableHead>
                <TableCell>
                  <Textarea value={formData.data.komentar_guru} onChange={(e) => setData('data.komentar_guru', e.target.value)} className="h-24" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pilih guru pembimbing tahsin</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <Select defaultValue={data.pembimbing} onValueChange={(value) => setData('data.pembimbing', value)}>
            <SelectTrigger className="w-xs">
              <SelectValue placeholder="Pilih pembina" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((user) => (
                <SelectItem value={user.name}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportTahsin;
