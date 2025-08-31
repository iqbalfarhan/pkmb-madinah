import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { capitalizeWords, hariNumberDescription } from '@/lib/utils';
import { ReportPerkembanganData } from '@/types/report';
import { FC } from 'react';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportPerkembanganData;
};

const ReportPerkembanganReader: FC<Props> = ({ data }) => {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold uppercase">
        LAPORAN PERKEMBANGAN SISWA PKBM AL-MADINAH SEMESTER ganjil TAHUN AJARAN 2024/2025
      </h1>
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
                <TableHead className="w-full">Sikap yang dikembangkan</TableHead>
                <TableHead className="text-center">I</TableHead>
                <TableHead className="text-center">II</TableHead>
                <TableHead className="text-center">III</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data.sikap).map(([item, value], index) => (
                <TableRow>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell>
                    <Checkbox checked={value === 1} />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={value === 2} />
                  </TableCell>
                  <TableCell>
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
        </CardHeader>
        <CardContent>
          <p>{data.komentar_guru}</p>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader>
          <CardTitle>Komentar anak</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Tulis komentar siswa disini"
            value={data.komentar_siswa}
            onChange={(e) => setData('data.komentar_siswa', e.target.value)}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Komentar orangtua/wali</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Tulis komentar wali disini"
            value={data.komentar_wali}
            onChange={(e) => setData('data.komentar_wali', e.target.value)}
          />
        </CardContent>
      </Card> */}
    </>
  );
};

export default ReportPerkembanganReader;
