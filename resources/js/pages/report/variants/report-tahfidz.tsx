import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { em, groupBy } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { PenilaianTahfidz, Report, ReportDataMeta, ReportTahfidzData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';
import ReportTahfidzFormSheet from '../components/report-tahfidz-form-sheet';

type Props = {
  data: ReportTahfidzData;
};

const ReportTahfidz: FC<Props> = ({ data }) => {
  const { report, teachers = [] } = usePage<SharedData & { report: Report; teachers: User[] }>().props;

  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportTahfidzData,
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

  const handleEditNilai = (index: number, updated: PenilaianTahfidz) => {
    const updatedNilai = [...formData.data.nilai]; // clone biar gak mutate langsung
    updatedNilai[index] = updated; // replace item di index tertentu
    setData('data.nilai', updatedNilai);
  };

  const handleDeleteNilai = (index: number) => {
    const updatedNilai = [...formData.data.nilai];
    updatedNilai.splice(index, 1); // hapus item di index tertentu
    setData('data.nilai', updatedNilai);
  };

  const handleAddNilai = () => {
    const updatedNilai = [
      ...formData.data.nilai,
      {
        juz: '',
        surah: '',
        pencapaian: '',
        keterangan: '',
      },
    ];
    setData('data.nilai', updatedNilai);
  };

  const groupByJuz = groupBy(formData.data.nilai, 'juz');

  return (
    <>
      <ReportHeader />
      <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
        <Check />
        Simpan
      </Button>
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardHeader>
          <CardTitle>List hafalan</CardTitle>
          <CardDescription>List hafalan yang sudah dihafal siswa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Surah</TableHead>
                <TableHead>Kemampuan yang Dicapai</TableHead>
                <TableHead>Keterangan Ayat</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupByJuz).map(([juz, items]) => (
                <>
                  {juz !== '' && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-muted text-center text-muted-foreground">
                        Hafalan Juz {juz}
                      </TableCell>
                    </TableRow>
                  )}
                  {items.map((item) => {
                    const globalIndex = formData.data.nilai.findIndex((n) => n.surah === item.surah && n.juz === item.juz);

                    return (
                      <TableRow key={`${item.juz}-${item.surah}`}>
                        <TableCell>{globalIndex + 1}</TableCell>
                        <TableCell>{item.surah}</TableCell>
                        <TableCell>{item.pencapaian}</TableCell>
                        <TableCell>{item.keterangan}</TableCell>
                        <TableCell>
                          <ReportTahfidzFormSheet purpose="edit" data={item} onSubmit={(updated) => handleEditNilai(globalIndex, updated)}>
                            <Button variant="ghost" size="icon">
                              <Edit />
                            </Button>
                          </ReportTahfidzFormSheet>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteNilai(globalIndex)}>
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddNilai}>
            <Plus /> Tambah baris
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1.5">
              <CardTitle>Catatan</CardTitle>
              <CardDescription>Catatan dari pembina tahfidz {data.pembimbing}</CardDescription>
            </div>
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
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <Textarea value={formData.data.catatan} onChange={(e) => setData('data.catatan', e.target.value)} />
        </CardContent>
      </Card>
    </>
  );
};

export default ReportTahfidz;
