import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { defaultPencapaianItem } from '@/lib/enums';
import { em, removeAtIndexMutable } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { Report, ReportDataMeta, ReportDoaHadistData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportPencapaianFormSheet from '../components/report-pencapaian-form-sheet';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportDoaHadistData;
};

const ReportDoaHadist: FC<Props> = ({ data }) => {
  const { report, teachers = [] } = usePage<SharedData & { report: Report; teachers: User[] }>().props;
  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportDoaHadistData,
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

  const handleAddBaris = (field: 'doa' | 'hadist') => {
    const updatedNilai = [...formData.data.doa, defaultPencapaianItem];
    setData(`data.${field}`, updatedNilai);
  };

  const handleRemoveBaris = (field: 'doa' | 'hadist', index: number) => {
    const newarray = removeAtIndexMutable(formData.data[field], index);
    setData(`data.${field}`, newarray);
  };

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
          <CardTitle>Hafalan doa</CardTitle>
          <CardDescription>List hafalan doa yang sudah dihafal</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Kemampuan yang dilakukan</TableHead>
                <TableHead>Kemampuan yang Dicapai</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.data.doa.map((doa, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{doa.judul}</TableCell>
                  <TableCell>{doa.pencapaian}</TableCell>
                  <TableCell>{doa.keterangan}</TableCell>
                  <TableCell>
                    <ReportPencapaianFormSheet
                      penilaian={doa}
                      onSave={(data) => {
                        setData(`data.doa.${index}`, data);
                      }}
                    >
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ReportPencapaianFormSheet>
                    <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveBaris('doa', index)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleAddBaris('doa')}>
            <Plus />
            Tambah baris
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hafalan hadist</CardTitle>
          <CardDescription>List hafalan hadist yang sudah dihafal</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Kemampuan yang dilakukan</TableHead>
                <TableHead>Kemampuan yang Dicapai</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.data.hadist.map((hadist, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{hadist.judul}</TableCell>
                  <TableCell>{hadist.pencapaian}</TableCell>
                  <TableCell>{hadist.keterangan}</TableCell>
                  <TableCell>
                    <ReportPencapaianFormSheet
                      penilaian={hadist}
                      onSave={(data) => {
                        setData(`data.hadist.${index}`, data);
                      }}
                    >
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ReportPencapaianFormSheet>
                    <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveBaris('hadist', index)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleAddBaris('hadist')}>
            <Plus />
            Tambah baris
          </Button>
        </CardFooter>
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
                <SelectItem key={user.id} value={user.name}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportDoaHadist;
