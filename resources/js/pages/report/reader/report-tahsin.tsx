import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { ReportDataMeta, ReportTahsinData } from '@/types/report';
import { FC } from 'react';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportTahsinData;
};

const ReportTahsinReader: FC<Props> = ({ data }) => {
  return (
    <>
      <ReportHeader />
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>Al-Muyassar/Jilid</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.jilid}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Hal</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.hal}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Nilai KKM</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.nilai_kkm}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Nilai Raport</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.nilai_rapor}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Nilai Rentang</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.nilai_rentang}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Titik Kuat</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.titik_kuat}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Titik Lemah</TableHead>
                <TableHead>:</TableHead>
                <TableCell>{data.titik_lemah}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Komentar Guru</TableHead>
                <TableHead>:</TableHead>
                <TableCell>
                  <p className="text-wrap">{data.komentar_guru}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportTahsinReader;
