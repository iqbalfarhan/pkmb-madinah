import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { groupBy } from '@/lib/utils';
import { ReportDataMeta, ReportTahfidzData } from '@/types/report';
import { FC } from 'react';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportTahfidzData;
};

const ReportTahfidzReader: FC<Props> = ({ data }) => {
  const groupByJuz = groupBy(data.nilai, 'juz');

  return (
    <>
      <ReportHeader />

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(groupByJuz).map(([juz, items]) => (
                <>
                  {juz !== '' && (
                    <TableRow>
                      <TableCell colSpan={4} className="bg-muted text-center text-muted-foreground">
                        Hafalan Juz {juz}
                      </TableCell>
                    </TableRow>
                  )}
                  {items.map((item) => {
                    const globalIndex = data.nilai.findIndex((n) => n.surah === item.surah && n.juz === item.juz);

                    return (
                      <TableRow key={`${item.juz}-${item.surah}`}>
                        <TableCell>{globalIndex + 1}</TableCell>
                        <TableCell>{item.surah}</TableCell>
                        <TableCell>{item.pencapaian}</TableCell>
                        <TableCell>{item.keterangan}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Catatan</CardTitle>
          <CardDescription>Catatan dari pembina tahfidz {data.pembimbing}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>{data.catatan}</CardContent>
      </Card>
    </>
  );
};

export default ReportTahfidzReader;
