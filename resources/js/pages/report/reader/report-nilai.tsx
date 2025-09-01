import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { groupBy } from '@/lib/utils';
import { ReportNilaiData } from '@/types/report';
import { FC } from 'react';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportNilaiData;
};

const ReportNilaiReader: FC<Props> = ({ data }) => {
  const groupMapel = groupBy(data.nilai, 'type');
  return (
    <>
      <h1 className="text-center text-3xl font-semibold uppercase">
        LAPORAN PERKEMBANGAN SISWA PKBM AL-MADINAH SEMESTER ganjil TAHUN AJARAN 2024/2025
      </h1>
      <ReportStudentCard student_name={data.nama} student_age={data.usia} student_nisn={data.nisn} classroom_name={data.kelas} />

      <Card>
        <CardHeader>
          <CardTitle>Hasil rekap nilai siswa.</CardTitle>
          <CardDescription>Nilai yang tampil saat ini adalah rekap nilai yang diisi oleh guru.</CardDescription>
        </CardHeader>

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

      {data.rapor_kenaikan_kelas && (
        <Card>
          <CardHeader>
            <CardTitle>Keputusan</CardTitle>
            <CardDescription>{data.keputusan}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <FormControl label="Keputusan">
                  <p>{data.keputusan}</p>
                </FormControl>
              </div>
              <div className="space-y-6"></div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ReportNilaiReader;
