import BackButton from '@/components/back-button';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { groupBy } from '@/lib/utils';
import { SharedData } from '@/types';
import { Grade } from '@/types/grade';
import { usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC } from 'react';
import AssessmentDeleteDialog from '../assessment/components/assessment-delete-dialog';
import AssessmentFormSheet from '../assessment/components/assessment-form-sheet';
import GradeFormSheet from './components/grade-form-sheet';

type Props = {
  grade: Grade;
};

const ShowGrade: FC<Props> = ({ grade }) => {
  const assessments = groupBy(grade.assessments, 'group');
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Detail Grade"
      description="Detail grade"
      actions={
        <>
          <BackButton />
          {permissions?.canUpdate && (
            <>
              <GradeFormSheet grade={grade} purpose="edit">
                <Button>
                  <Edit />
                  Edit tingkat kelas
                </Button>
              </GradeFormSheet>
            </>
          )}
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{grade.name}</CardTitle>
          <CardDescription>
            {`Tingkat: ${grade.group}`} - {`Sikap: ${grade.characters.join(', ')}`}
          </CardDescription>
        </CardHeader>
      </Card>
      <HeadingSmall
        title="Daftar penilaian rapor Al-muyassar"
        description="Penilaian rapor almuyassar untuk kelas ini"
        actions={
          <>
            <AssessmentFormSheet purpose="create" grade={grade}>
              <Button>
                <Plus />
                Tambah penilaian
              </Button>
            </AssessmentFormSheet>
          </>
        }
      />
      <div className="grid">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(assessments).map(([key, value]) => {
              return (
                <>
                  <TableRow>
                    <TableHead className="bg-muted text-center" colSpan={4}>
                      {key}
                    </TableHead>
                  </TableRow>
                  {value.map((assessment, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{assessment.name}</TableCell>
                      <TableCell>{assessment.semester}</TableCell>
                      <TableCell className="text-center">
                        <AssessmentFormSheet assessment={assessment} purpose="edit">
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </AssessmentFormSheet>
                        <AssessmentDeleteDialog assessment={assessment}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Trash2 />
                          </Button>
                        </AssessmentDeleteDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
};

export default ShowGrade;
