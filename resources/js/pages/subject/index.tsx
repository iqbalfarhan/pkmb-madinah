import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Subject } from '@/types/subject';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import SubjectBulkDeleteDialog from './components/subject-bulk-delete-dialog';
import SubjectBulkEditSheet from './components/subject-bulk-edit-sheet';
import SubjectDeleteDialog from './components/subject-delete-dialog';
import SubjectFilterSheet from './components/subject-filter-sheet';
import SubjectFormSheet from './components/subject-form-sheet';

type Props = {
  subjects: Subject[];
  query: { [key: string]: string };
};

const SubjectList: FC<Props> = ({ subjects, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Mata pelajaran"
      description="Manage your subjects"
      actions={
        <>
          {permissions?.canAdd && (
            <SubjectFormSheet purpose="create">
              <Button>
                <Plus />
                Create new subject
              </Button>
            </SubjectFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search subjects..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <SubjectFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </SubjectFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <SubjectBulkEditSheet subjectIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </SubjectBulkEditSheet>
            <SubjectBulkDeleteDialog subjectIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </SubjectBulkDeleteDialog>
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
                    checked={ids.length === subjects.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(subjects.map((subject) => subject.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects
            .filter((subject) => JSON.stringify(subject).toLowerCase().includes(cari.toLowerCase()))
            .map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(subject.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, subject.id]);
                          } else {
                            setIds(ids.filter((id) => id !== subject.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{subject.group}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('subject.show', subject.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <SubjectFormSheet purpose="edit" subject={subject}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </SubjectFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <SubjectDeleteDialog subject={subject}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </SubjectDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default SubjectList;
