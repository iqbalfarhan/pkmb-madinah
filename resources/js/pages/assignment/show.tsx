import BackButton from '@/components/back-button';
import HeadingSmall from '@/components/heading-small';
import MarkdownReader from '@/components/markdown-reader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS } from '@/lib/utils';
import { SharedData } from '@/types';
import { Assignment } from '@/types/assignment';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Folder, FolderOpen, Trash2, Upload } from 'lucide-react';
import { FC } from 'react';
import ScoreAnswerPopup from '../score/components/score-answer-popup';
import ScoreDeleteDialog from '../score/components/score-delete-dialog';
import ScoreFormPopup from '../score/components/score-form-popover';
import ScoreFormSheet from '../score/components/score-form-sheet';
import ScoreUploadAnswerDialog from '../score/components/score-upload-answer-dialog';
import AssignmentFormSheet from './components/assignment-form-sheet';

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
          <CardDescription>{assignment.lesson.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownReader content={assignment.description} className="prose-sm" />
        </CardContent>
        <Separator />
        <CardFooter>
          {permissions?.canUpdateAssignment && (
            <AssignmentFormSheet purpose="edit" assignment={assignment}>
              <Button>
                <Edit />
                Edit keterangan tugas
              </Button>
            </AssignmentFormSheet>
          )}
          <Button variant={'ghost'} disabled>
            {`Bobot nilai: ${assignment.rate}%`}
          </Button>
        </CardFooter>
      </Card>

      <div className="grid space-y-4">
        <HeadingSmall
          title="Sudah mengumpul atau diberi nilai"
          description="List jawaban siswa yang sudah mengerjakan tugas"
          actions={
            <>
              {assignment.uploadable && (
                <ScoreUploadAnswerDialog assignment={assignment}>
                  <Button>
                    <Upload /> Upload jawaban
                  </Button>
                </ScoreUploadAnswerDialog>
              )}
            </>
          }
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama siswa</TableHead>
              <TableHead>Tanggal pengumpulan</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead>Nilai</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score) => (
              <TableRow>
                <TableCell>{score.student.name}</TableCell>
                <TableCell>{dateDFYHIS(score.created_at)}</TableCell>
                <TableCell>
                  {(score.media ?? []).length > 0 && (
                    <ScoreAnswerPopup score={score}>
                      <Button variant={'ghost'} size={'sm'}>
                        <FolderOpen />
                        Lihat jawaban
                      </Button>
                    </ScoreAnswerPopup>
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
