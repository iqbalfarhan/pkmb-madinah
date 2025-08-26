import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Prevschool } from '@/types/prevschool';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import PrevschoolDeleteDialog from './components/prevschool-delete-dialog';
import PrevschoolFilterSheet from './components/prevschool-filter-sheet';
import PrevschoolFormSheet from './components/prevschool-form-sheet';
import PrevschoolBulkEditSheet from './components/prevschool-bulk-edit-sheet';
import PrevschoolBulkDeleteDialog from './components/prevschool-bulk-delete-dialog';

type Props = {
  prevschools: Prevschool[];
  query: { [key: string]: string };
};

const PrevschoolList: FC<Props> = ({ prevschools, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Prevschools"
      description="Manage your prevschools"
      actions={
        <>
          {permissions?.canAdd && (
            <PrevschoolFormSheet purpose="create">
              <Button>
                <Plus />
                Create new prevschool
              </Button>
            </PrevschoolFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search prevschools..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <PrevschoolFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </PrevschoolFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <PrevschoolBulkEditSheet prevschoolIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </PrevschoolBulkEditSheet>
            <PrevschoolBulkDeleteDialog prevschoolIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </PrevschoolBulkDeleteDialog>
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
                    checked={ids.length === prevschools.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(prevschools.map((prevschool) => prevschool.id));
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
          {prevschools
            .filter((prevschool) => JSON.stringify(prevschool).toLowerCase().includes(cari.toLowerCase()))
            .map((prevschool) => (
              <TableRow key={prevschool.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(prevschool.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, prevschool.id]);
                          } else {
                            setIds(ids.filter((id) => id !== prevschool.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ prevschool.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('prevschool.show', prevschool.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <PrevschoolFormSheet purpose="edit" prevschool={prevschool}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </PrevschoolFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <PrevschoolDeleteDialog prevschool={prevschool}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </PrevschoolDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PrevschoolList;
