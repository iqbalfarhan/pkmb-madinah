import BackButton from '@/components/back-button';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS } from '@/lib/utils';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, FolderOpen, Trash2 } from 'lucide-react';
import { FC } from 'react';
import ScoreDeleteDialog from '../score/components/score-delete-dialog';
import ScoreFormPopup from '../score/components/score-form-popover';
import ScoreFormSheet from '../score/components/score-form-sheet';

type Props = {
  assignment: Assignment;
};

const ShowAssignment: FC<Props> = ({ assignment }) => {
  const scores = assignment.scores;
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Detail Assignment"
      description="Detail assignment"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{assignment.name}</CardTitle>
          <CardDescription>{assignment.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid space-y-4">
        <HeadingSmall title="Sudah mengumpul" description="List jawaban siswa yang sudah mengerjakan tugas" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal pengumpulan</TableHead>
              <TableHead>Nama siswa</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score) => (
              <TableRow>
                <TableCell>{dateDFYHIS(score.created_at)}</TableCell>
                <TableCell>{score.student.name}</TableCell>
                <TableCell>
                  {(score.media ?? []).length > 0 && (
                    <Button size={'sm'}>
                      <FolderOpen />
                      Lihat jawaban
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <ScoreFormPopup score={score} />
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('score.show', score.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ScoreFormSheet purpose="edit" score={score}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ScoreFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ScoreDeleteDialog score={score}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ScoreDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default ShowAssignment;
