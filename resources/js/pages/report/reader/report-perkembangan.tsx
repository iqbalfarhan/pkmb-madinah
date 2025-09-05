import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { capitalizeWords, em, hariNumberDescription } from '@/lib/utils';
import { Report, ReportPerkembanganData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { FC } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportPerkembanganData;
};

const ReportPerkembanganReader: FC<Props> = ({ data }) => {
  const { report } = usePage<{ report: Report }>().props;

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
      <ReportStudentCard student_name={data.nama} student_age={data.usia} student_nisn={data.nisn} classroom_name={data.kelas} />

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
                        <Checkbox checked={item.mark === mark} />
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
          <CardTitle>4 dari 18 Sikap yang dibangun di Sekolah Al – Madinah.</CardTitle>
          <CardDescription>
            <li>I (membutuhkan motivasi)</li>
            <li>II (menunjukkan perbaikan)</li>
            <li>III (memiliki kompetensi)</li>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Sikap yang dikembangkan</TableHead>
                <TableHead className="w-[50px] text-center">I</TableHead>
                <TableHead className="w-[50px] text-center">II</TableHead>
                <TableHead className="w-[50px] text-center">III</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data.sikap).map(([item, value], index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={value === 1} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={value === 2} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox checked={value === 3} />
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
                  <TableCell>{hariNumberDescription(data.ketidakhadiran[item])}</TableCell>
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
          <CardDescription>{data.walikelas}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data.komentar_guru}</p>
        </CardContent>
      </Card>
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
    </>
  );
};

export default ReportPerkembanganReader;
