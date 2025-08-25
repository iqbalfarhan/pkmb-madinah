import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Family } from '@/types/family';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import FamilyDeleteDialog from './components/family-delete-dialog';
import FamilyFilterSheet from './components/family-filter-sheet';
import FamilyFormSheet from './components/family-form-sheet';
import FamilyBulkEditSheet from './components/family-bulk-edit-sheet';
import FamilyBulkDeleteDialog from './components/family-bulk-delete-dialog';

type Props = {
  families: Family[];
  query: { [key: string]: string };
};

const FamilyList: FC<Props> = ({ families, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Familys"
      description="Manage your families"
      actions={
        <>
          {permissions?.canAdd && (
            <FamilyFormSheet purpose="create">
              <Button>
                <Plus />
                Create new family
              </Button>
            </FamilyFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search families..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <FamilyFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </FamilyFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <FamilyBulkEditSheet familyIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </FamilyBulkEditSheet>
            <FamilyBulkDeleteDialog familyIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </FamilyBulkDeleteDialog>
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
                    checked={ids.length === families.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(families.map((family) => family.id));
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
          {families
            .filter((family) => JSON.stringify(family).toLowerCase().includes(cari.toLowerCase()))
            .map((family) => (
              <TableRow key={family.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(family.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, family.id]);
                          } else {
                            setIds(ids.filter((id) => id !== family.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ family.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('family.show', family.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <FamilyFormSheet purpose="edit" family={family}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </FamilyFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <FamilyDeleteDialog family={family}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </FamilyDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default FamilyList;
