import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { em, groupBy } from '@/lib/utils';
import { Grade } from '@/types/grade';
import { Report, ReportDataMeta, ReportNilaiData } from '@/types/report';
import { Student } from '@/types/student';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, RefreshCcw } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportNilaiData;
};

const ReportNilai: FC<Props> = ({ data }) => {
  const { report, grades = [] } = usePage<{ student: Student; report: Report; grades: Grade[] }>().props;

  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportNilaiData,
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

  const groupMapel = groupBy(formData.data.nilai, 'type');

  const handleRefreshNilai = () => {
    router.put(
      route('report.refresh-nilai', report.id),
      {
        type: report.report_type,
      },
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Nilai updated'),
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  return (
    <>
      <ReportHeader />
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
        <Check />
        Simpan
      </Button>

      <Card>
        <div className="flex justify-between">
          <CardHeader>
            <CardTitle>Hasil rekap nilai siswa.</CardTitle>
            <CardDescription>Nilai yang tampil saat ini adalah rekap nilai yang diisi oleh guru.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant={'secondary'} onClick={handleRefreshNilai}>
              <RefreshCcw />
              Refresh nilai
            </Button>
          </CardFooter>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead rowSpan={2} className="text-center">
                  No
                </TableHead>
                <TableHead rowSpan={2} className="text-center">
                  Mata pelajaran
                </TableHead>
                <TableHead colSpan={3} className="text-center">
                  Nilai
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="w-32 text-center">Tugas</TableHead>
                <TableHead className="w-32 text-center">Evaluasi</TableHead>
                <TableHead className="w-32 text-center">Rata rata</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupMapel).map(([group, mapel]) => (
                <>
                  {group !== 'Pelajaran dasar' && (
                    <TableRow>
                      <TableCell colSpan={5}>{group}</TableCell>
                    </TableRow>
                  )}
                  {mapel.map((nilai, index) => (
                    <TableRow>
                      <TableCell>
                        <Button size={'icon'} variant={'ghost'} disabled>
                          {index + 1}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <p className="text-wrap">{nilai.name}</p>
                      </TableCell>
                      <TableCell className="text-center">{nilai.nilai_tugas}</TableCell>
                      <TableCell className="text-center">{nilai.evaluasi}</TableCell>
                      <TableCell className="text-center">{nilai.rata_rata}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Rata-rata
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} disabled size={'icon'}>
                    100.00
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} disabled size={'icon'}>
                    100.00
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={'ghost'} disabled size={'icon'}>
                    100.00
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Label className="flex h-9 items-center gap-2">
        <Checkbox checked={formData.data.rapor_kenaikan_kelas} onCheckedChange={(c) => setData('data.rapor_kenaikan_kelas', c as boolean)} />
        <span>Rapor ini merupakan rapor kenaikan kelas?</span>
      </Label>

      {formData.data.rapor_kenaikan_kelas && (
        <Card>
          <CardHeader>
            <CardTitle>Keputusan kenaikan kelas</CardTitle>
            <CardDescription>Pilih keputusan kenaikan kelas</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormControl label="Keputusan">
                  <Textarea value={formData.data.keputusan} onChange={(e) => setData('data.keputusan', e.target.value)} />
                </FormControl>
              </div>
              <div className="space-y-6">
                <FormControl label="Naik kelas?">
                  <Select
                    value={formData.data.naik_kelas ? 'true' : 'false'}
                    onValueChange={(value) => setData('data.naik_kelas', value === 'true' ? true : false)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas selanjutnya" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Naik kelas</SelectItem>
                      <SelectItem value="false">Tidak naik kelas</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {formData.data.naik_kelas !== null && (
                  <FormControl label={formData.data.naik_kelas ? 'Naik ke kelas' : 'Tetap di kelas'}>
                    <Select value={formData.data.ke_kelas} onValueChange={(value) => setData('data.ke_kelas', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenjang kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem value={grade.name}>{grade.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ReportNilai;
