import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Bill } from '@/types/bill';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import BillBulkDeleteDialog from './components/bill-bulk-delete-dialog';
import BillBulkEditSheet from './components/bill-bulk-edit-sheet';
import BillDeleteDialog from './components/bill-delete-dialog';
import BillFilterSheet from './components/bill-filter-sheet';
import BillFormSheet from './components/bill-form-sheet';
import BillStatusBadge from './components/bill-status-badge';

type Props = {
  bills: Bill[];
  query: { [key: string]: string };
};

const BillList: FC<Props> = ({ bills, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Bills"
      description="Manage your bills"
      actions={
        <>
          {permissions?.canAdd && (
            <BillFormSheet purpose="create">
              <Button>
                <Plus />
                Create new bill
              </Button>
            </BillFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search bills..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <BillFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </BillFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <BillBulkEditSheet billIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </BillBulkEditSheet>
            <BillBulkDeleteDialog billIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </BillBulkDeleteDialog>
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
                    checked={ids.length === bills.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(bills.map((bill) => bill.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Student name</TableHead>
            <TableHead>Payment type</TableHead>
            <TableHead>Payment cycle</TableHead>
            <TableHead>Total amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills
            .filter((bill) => JSON.stringify(bill).toLowerCase().includes(cari.toLowerCase()))
            .map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(bill.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, bill.id]);
                          } else {
                            setIds(ids.filter((id) => id !== bill.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{bill.student.name}</TableCell>
                <TableCell>{bill.payment_type.name}</TableCell>
                <TableCell>{bill.payment_type.billing_cycle}</TableCell>
                <TableCell>{formatRupiah(bill.total_amount)}</TableCell>
                <TableCell>
                  <BillStatusBadge status={bill.status} />
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('bill.show', bill.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <BillFormSheet purpose="edit" bill={bill}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </BillFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <BillDeleteDialog bill={bill}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </BillDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default BillList;
