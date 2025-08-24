import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LessonNilaiTab = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>NISN</TableHead>
          <TableHead>Nama siswa</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default LessonNilaiTab;
