import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Report, ReportDataMeta, ReportPerkembanganData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportPerkembanganData;
};

const ReportPerkembanganReader: FC<Props> = ({ data }) => {
  const { report, permissions } = usePage<SharedData & { report: Report }>().props;

  const {
    data: formData,
    setData,
    put,
    processing,
  } = useForm({
    data: report.data as ReportPerkembanganData,
  });

  const handlePostComment = () => {
    put(route('report.update', report.id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Berhasil menyimpan'),
      onError: (e) => toast.error(em(e)),
    });
  };
  return (
    <>
      <ReportHeader />
      <ReportStudentCard meta={data as ReportDataMeta} />

      <h2 className="text-center text-xl font-bold">CURRICULAR DOMAIN</h2>
      {data.curricular_domain.map((nilai, nilaiIndex) => (
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
                      <p className="text-wrap">{item.description}</p>
                    </TableCell>
                    {['A', 'B', 'C'].map((mark) => (
                      <TableCell key={mark}>
                        {item.mark === mark && (
                          <Button size={'icon'} variant={'ghost'} disabled>
                            <Check className="size-5" />
                          </Button>
                        )}
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
          <CardTitle>{Object.entries(data.sikap).length ?? 0} dari 18 Sikap yang dibangun di Sekolah Al – Madinah.</CardTitle>
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
                <TableHead>Sikap yang dikembangkan</TableHead>
                <TableHead className="w-[50px] text-center">★</TableHead>
                <TableHead className="w-[50px] text-center">★★</TableHead>
                <TableHead className="w-[50px] text-center">★★★</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data.sikap).map(([item, value], index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell className="text-center">
                    {value === 1 && (
                      <Button size={'icon'} variant={'ghost'} disabled>
                        <Check className="size-5" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {value === 2 && (
                      <Button size={'icon'} variant={'ghost'} disabled>
                        <Check className="size-5" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {value === 3 && (
                      <Button size={'icon'} variant={'ghost'} disabled>
                        <Check className="size-5" />
                      </Button>
                    )}
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
              {data.ekskul.map(({ nama, kegiatan }, index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{kegiatan}</TableCell>
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
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Jumlah (hari)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['sakit', 'izin', 'tanpa keterangan'].map((item, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{capitalizeWords(item)}</TableCell>
                  <TableCell>{data.ketidakhadiran[item]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-center text-xl font-bold">KOMENTAR</h2>

      <Card>
        <CardHeader>
          <CardTitle>Komentar guru:</CardTitle>
          <CardDescription>{data.walikelas}</CardDescription>
          <q>{data.komentar_guru}</q>
        </CardHeader>
        <Separator />
        <CardHeader>
          <CardTitle>Komentar siswa:</CardTitle>
          <CardDescription>{data.nama}</CardDescription>
          <q>{data.komentar_siswa}</q>
        </CardHeader>
        <CardHeader>
          <CardTitle>Komentar orangtua/wali:</CardTitle>
          <CardDescription>Orang tua atau wali dari {data.nama}</CardDescription>
          <q>{data.komentar_wali}</q>
        </CardHeader>
      </Card>
      {permissions?.canAddParentComment && (
        <div className="grid gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Komentar anak</CardTitle>
              <CardDescription>{data.nama}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tulis komentar siswa disini"
                value={formData.data.komentar_siswa}
                onChange={(e) => setData('data.komentar_siswa', e.target.value)}
              />
            </CardContent>
            <Separator />
            <CardHeader>
              <CardTitle>Komentar orangtua/wali</CardTitle>
              <CardDescription>Orangtua {data.nama}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tulis komentar wali disini"
                value={formData.data.komentar_wali}
                onChange={(e) => setData('data.komentar_wali', e.target.value)}
              />
            </CardContent>
            <Separator />
            <CardFooter>
              <SubmitButton loading={processing} label="Simpan komentar" onClick={handlePostComment} />
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default ReportPerkembanganReader;
