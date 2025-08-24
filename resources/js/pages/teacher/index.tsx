import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Teacher } from '@/types/teacher';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TeacherBulkDeleteDialog from './components/teacher-bulk-delete-dialog';
import TeacherBulkEditSheet from './components/teacher-bulk-edit-sheet';
import TeacherDeleteDialog from './components/teacher-delete-dialog';
import TeacherFilterSheet from './components/teacher-filter-sheet';
import TeacherFormSheet from './components/teacher-form-sheet';

type Props = {
  teachers: Teacher[];
  query: { [key: string]: string };
};

const TeacherList: FC<Props> = ({ teachers, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Teachers"
      description="Manage your teachers"
      actions={
        <>
          {permissions?.canAdd && (
            <TeacherFormSheet purpose="create">
              <Button>
                <Plus />
                Create new teacher
              </Button>
            </TeacherFormSheet>
          )}
          <Button variant={'destructive'} size={'icon'} asChild>
            <Link href={route('teacher.archived')}>
              <FolderArchive />
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search teachers..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <TeacherFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </TeacherFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <TeacherBulkEditSheet teacherIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </TeacherBulkEditSheet>
            <TeacherBulkDeleteDialog teacherIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </TeacherBulkDeleteDialog>
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
                    checked={ids.length === teachers.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(teachers.map((teacher) => teacher.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers
            .filter((teacher) => JSON.stringify(teacher).toLowerCase().includes(cari.toLowerCase()))
            .map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(teacher.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, teacher.id]);
                          } else {
                            setIds(ids.filter((id) => id !== teacher.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.gender ? 'Laki-laki' : 'Perempuan'}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('teacher.show', teacher.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <TeacherFormSheet purpose="edit" teacher={teacher}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </TeacherFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <TeacherDeleteDialog teacher={teacher}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </TeacherDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default TeacherList;
