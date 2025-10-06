import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, numberPad } from '@/lib/utils';
import { SharedData } from '@/types';
import { Bill } from '@/types/bill';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, PlusCircle, Trash2 } from 'lucide-react';
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

const BillList: FC<Props> = ({ bills = [], query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Tagihan siswa"
      description="Manage your bills"
      actions={
        <>
          {permissions?.canAdd && (
            <>
              <Button asChild>
                <Link href={route('bill.bulk.create')}>
                  <PlusCircle />
                  Buat sekaligus
                </Link>
              </Button>
              <BillFormSheet purpose="create">
                <Button>
                  <Plus />
                  Buat tagihan
                </Button>
              </BillFormSheet>
            </>
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
            <BillBulkDeleteDialog billIds={ids} onSuccess={() => setIds([])}>
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
            <TableHead>Kode</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Untuk pembayaran</TableHead>
            <TableHead>Total Nominal</TableHead>
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
                <TableCell className="font-mono">#{numberPad(bill.id)}</TableCell>
                <TableCell>{bill.student.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline">{bill.payment_type.billing_cycle}</Badge>
                    <span>{bill.payment_type.name}</span>
                  </div>
                </TableCell>
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
