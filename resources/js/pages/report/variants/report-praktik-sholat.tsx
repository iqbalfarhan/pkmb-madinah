import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { defaultPencapaianItem } from '@/lib/enums';
import { em, removeAtIndexMutable } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { Report, ReportDataMeta, ReportPraktikSholatData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportPencapaianFormSheet from '../components/report-pencapaian-form-sheet';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportPraktikSholatData;
};

const ReportPraktikSholat: FC<Props> = ({ data }) => {
  const { report, teachers = [] } = usePage<SharedData & { report: Report; teachers: User[] }>().props;

  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportPraktikSholatData,
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

  const handleAddBaris = (field: 'gerakan' | 'bacaan') => {
    const updatedNilai = [...formData.data.gerakan, defaultPencapaianItem];
    setData(`data.${field}`, updatedNilai);
  };

  const handleRemoveBaris = (field: 'gerakan' | 'bacaan', index: number) => {
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
          <CardTitle>Bacaan sholat</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, et?</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Kemampuan yang dilakukan</TableHead>
                <TableHead>Kemampuan yang dicapai</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.data.bacaan.map((bacaan, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bacaan.judul}</TableCell>
                  <TableCell>{bacaan.pencapaian}</TableCell>
                  <TableCell>{bacaan.keterangan}</TableCell>
                  <TableCell className="text-center">
                    <ReportPencapaianFormSheet
                      penilaian={bacaan}
                      onSave={(data) => {
                        setData(`data.bacaan.${index}`, data);
                      }}
                    >
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ReportPencapaianFormSheet>
                    <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveBaris('bacaan', index)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleAddBaris('bacaan')}>
            <Plus />
            Tambah baris
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gerakan sholat</CardTitle>
          <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, et?</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Kemampuan yang dilakukan</TableHead>
                <TableHead>Kemampuan yang dicapai</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.data.gerakan.map((gerakan, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{gerakan.judul}</TableCell>
                  <TableCell>{gerakan.pencapaian}</TableCell>
                  <TableCell>{gerakan.keterangan}</TableCell>
                  <TableCell className="text-center">
                    <ReportPencapaianFormSheet
                      penilaian={gerakan}
                      onSave={(data) => {
                        setData(`data.gerakan.${index}`, data);
                      }}
                    >
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ReportPencapaianFormSheet>
                    <Button variant={'ghost'} size={'icon'} onClick={() => handleRemoveBaris('gerakan', index)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleAddBaris('gerakan')}>
            <Plus />
            Tambah baris
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pilih guru pembimbing</CardTitle>
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

export default ReportPraktikSholat;
