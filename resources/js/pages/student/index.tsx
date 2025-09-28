import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Student } from '@/types/student';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import StudentBulkDeleteDialog from './components/student-bulk-delete-dialog';
import StudentBulkEditSheet from './components/student-bulk-edit-sheet';
import StudentDeleteDialog from './components/student-delete-dialog';
import StudentFilterSheet from './components/student-filter-sheet';
import StudentFormSheet from './components/student-form-sheet';
import StudentStatusBadge from './components/student-status-badge';

type Props = {
  students: Student[];
  query: { [key: string]: string };
};

const StudentList: FC<Props> = ({ students, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Students"
      description="Manage your students"
      actions={
        <>
          {permissions?.canAdd && (
            <StudentFormSheet purpose="create">
              <Button>
                <Plus />
                Create new student
              </Button>
            </StudentFormSheet>
          )}
          <Button variant={'destructive'} asChild>
            <Link href={route('student.archived')}>
              <FolderArchive />
              Arsip
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search students..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <StudentFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </StudentFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <StudentBulkEditSheet studentIds={ids} onSuccess={() => setIds([])}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </StudentBulkEditSheet>
            <StudentBulkDeleteDialog studentIds={ids} onSuccess={() => setIds([])}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </StudentBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === students.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(students.map((student) => student.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Kelahiran</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students
            .filter((student) => JSON.stringify(student).toLowerCase().includes(cari.toLowerCase()))
            .map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(student.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, student.id]);
                          } else {
                            setIds(ids.filter((id) => id !== student.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{student.nisn}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gender ? 'Laki-laki' : 'Perempuan'}</TableCell>
                <TableCell>{student.kelahiran}</TableCell>
                <TableCell title={`Tingkat ${student.grade?.name}`}>
                  <Badge>{student.grade_id}</Badge>
                  {student.classroom?.name}
                </TableCell>
                <TableCell>
                  <StudentStatusBadge status={student.status} />
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('student.show', student.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <StudentFormSheet purpose="edit" student={student}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </StudentFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <StudentDeleteDialog student={student}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </StudentDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default StudentList;
