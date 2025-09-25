import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { PointMark, Report, ReportDataMeta, ReportPerkembanganData } from '@/types/report';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { Check, Download, FileJson } from 'lucide-react';
import { FC, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportPerkembanganData | null;
};

const ReportPerkambangan: FC<Props> = ({ data }) => {
  const { student, report } = usePage<{ student: Student; report: Report }>().props;

  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportPerkembanganData,
  });

  const handleDescriptionChange = useDebouncedCallback((nilaiIndex: number, pointIndex: number, value: string) => {
    const updated = { ...formData };
    updated.data.curricular_domain[nilaiIndex].points[pointIndex].description = value;
    setData(updated);
  }, 300);

  const handleUpdate = useCallback(() => {
    put(route('report.update', report.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rapor berhasil disimpan');
      },
      onError: (e) => toast.error(em(e)),
    });
  }, [put, report.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Biar gak nge-save halaman
        handleUpdate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup pas komponen unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUpdate]);

  return (
    <>
      <ReportHeader />
      <ReportStudentCard meta={data as ReportDataMeta} />
      <div className="fixed right-6 -bottom-2 z-50">
        <div className="flex flex-col gap-2">
          <Button asChild variant={'secondary'}>
            <a href={route('report.download', report.id)}>
              <Download />
              Download PDF
            </a>
          </Button>
          <Button asChild variant={'secondary'}>
            <a href={route('report.raw', report.id)}>
              <FileJson />
              Raw data
            </a>
          </Button>
          <Button onClick={handleUpdate}>
            <Check />
            Simpan
          </Button>
        </div>
      </div>

      <h2 className="text-center text-xl font-bold">CURRICULAR DOMAIN</h2>
      {formData.data.curricular_domain.map((nilai, nilaiIndex) => (
        <Card key={nilaiIndex}>
          <CardHeader>
            <CardTitle>{nilai.name}</CardTitle>
            <CardDescription>{nilai.goal}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="text-center">Fokus Perkembangan</TableCell>
                  <TableCell className="w-xl text-center">Perkembangan anak</TableCell>
                  <TableCell className="w-[50px] text-center">A</TableCell>
                  <TableCell className="w-[50px] text-center">B</TableCell>
                  <TableCell className="w-[50px] text-center">C</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nilai.points.map((item, pointIndex) => (
                  <TableRow key={pointIndex}>
                    <TableCell>
                      <div className="text-wrap">{item.name}</div>
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Tulis deskripsi disini..."
                        className="min-h-20"
                        defaultValue={item.description}
                        onChange={(e) => handleDescriptionChange(nilaiIndex, pointIndex, e.target.value)}
                      />
                    </TableCell>
                    {['A', 'B', 'C'].map((mark) => (
                      <TableCell key={mark}>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedData = { ...formData };
                            updatedData.data.curricular_domain[nilaiIndex].points[pointIndex].mark = mark as PointMark;
                            setData(updatedData);
                          }}
                        >
                          <Checkbox checked={item.mark === mark} />
                        </Button>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-center text-xl font-bold">18 SIKAP</h2>

      <Card>
        <CardHeader>
          <CardTitle>{Object.entries(formData.data.sikap).length ?? 0} dari 18 Sikap yang dibangun di Sekolah Al – Madinah.</CardTitle>
          <CardDescription>
            <div className="flex flex-col">
              <span>★ (membutuhkan motivasi)</span>
              <span>★★ (menunjukkan perbaikan)</span>
              <span>★★★ (memiliki kompetensi)</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead className="w-full">Sikap yang dikembangkan</TableHead>
                <TableHead className="text-center">★</TableHead>
                <TableHead className="text-center">★★</TableHead>
                <TableHead className="text-center">★★★</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(formData.data.sikap).map(([item, value], index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell className="text-center">
                    <Button variant={'ghost'} size={'icon'}>
                      <Checkbox checked={value === 1} onCheckedChange={(c) => setData(`data.sikap.${item}`, c ? 1 : null)} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant={'ghost'} size={'icon'}>
                      <Checkbox checked={value === 2} onCheckedChange={(c) => setData(`data.sikap.${item}`, c ? 2 : null)} />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant={'ghost'} size={'icon'}>
                      <Checkbox checked={value === 3} onCheckedChange={(c) => setData(`data.sikap.${item}`, c ? 3 : null)} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-center text-xl font-bold">EKSTRAKULIKULER</h2>
      <Card>
        <CardHeader>
          <CardTitle>Ekstrakulikuler</CardTitle>
          <CardDescription>Ekstarkulukuler dan kegiatan yang diikuti siswa</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Jenis Ekstrakurikuler</TableHead>
                <TableHead>Kegiatan yang pernah Diikuti</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.activities?.map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{item.extracurricular.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-center text-xl font-bold">KETIDAKHADIRAN</h2>

      <Card>
        <CardHeader>
          <CardTitle>Ketidakhadiran</CardTitle>
          <CardDescription>Ketidakhadiran siswa tahun ajaran ini</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {['sakit', 'izin', 'tanpa keterangan'].map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{capitalizeWords(item)}</TableCell>
                  <TableCell>{formData.data.ketidakhadiran[item]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-center text-xl font-bold">KOMENTAR</h2>

      <Card>
        <CardHeader>
          <CardTitle>Komentar guru</CardTitle>
          <CardDescription>{formData.data.walikelas}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Tulis komentar guru disini"
            value={formData.data.komentar_guru}
            onChange={(e) => setData('data.komentar_guru', e.target.value)}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ReportPerkambangan;
