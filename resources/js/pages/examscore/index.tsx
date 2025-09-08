import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Examscore } from '@/types/examscore';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ExamscoreBulkDeleteDialog from './components/examscore-bulk-delete-dialog';
import ExamscoreBulkEditSheet from './components/examscore-bulk-edit-sheet';
import ExamscoreDeleteDialog from './components/examscore-delete-dialog';
import ExamscoreFilterSheet from './components/examscore-filter-sheet';
import ExamscoreFormSheet from './components/examscore-form-sheet';

type Props = {
  examscores: Examscore[];
  query: { [key: string]: string };
};

const ExamscoreList: FC<Props> = ({ examscores, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Examscores"
      description="Manage your examscores"
      actions={
        <>
          {permissions?.canAdd && (
            <ExamscoreFormSheet purpose="create">
              <Button>
                <Plus />
                Create new examscore
              </Button>
            </ExamscoreFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search examscores..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <ExamscoreFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </ExamscoreFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <ExamscoreBulkEditSheet examscoreIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </ExamscoreBulkEditSheet>
            <ExamscoreBulkDeleteDialog examscoreIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </ExamscoreBulkDeleteDialog>
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
                    checked={ids.length === examscores.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(examscores.map((examscore) => examscore.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {examscores
            .filter((examscore) => JSON.stringify(examscore).toLowerCase().includes(cari.toLowerCase()))
            .map((examscore) => (
              <TableRow key={examscore.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(examscore.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, examscore.id]);
                          } else {
                            setIds(ids.filter((id) => id !== examscore.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{examscore.name}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('examscore.show', examscore.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <ExamscoreFormSheet purpose="edit" examscore={examscore}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </ExamscoreFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <ExamscoreDeleteDialog examscore={examscore}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </ExamscoreDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ExamscoreList;
