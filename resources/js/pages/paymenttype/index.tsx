import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Paymenttype } from '@/types/paymenttype';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import PaymenttypeBulkDeleteDialog from './components/paymenttype-bulk-delete-dialog';
import PaymenttypeBulkEditSheet from './components/paymenttype-bulk-edit-sheet';
import PaymenttypeDeleteDialog from './components/paymenttype-delete-dialog';
import PaymenttypeFilterSheet from './components/paymenttype-filter-sheet';
import PaymenttypeFormSheet from './components/paymenttype-form-sheet';

type Props = {
  paymenttypes: Paymenttype[];
  query: { [key: string]: string };
};

const PaymenttypeList: FC<Props> = ({ paymenttypes, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Paymenttypes"
      description="Manage your paymenttypes"
      actions={
        <>
          {permissions?.canAdd && (
            <PaymenttypeFormSheet purpose="create">
              <Button>
                <Plus />
                Create new paymenttype
              </Button>
            </PaymenttypeFormSheet>
          )}
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search paymenttypes..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <PaymenttypeFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </PaymenttypeFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <PaymenttypeBulkEditSheet paymenttypeIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </PaymenttypeBulkEditSheet>
            <PaymenttypeBulkDeleteDialog paymenttypeIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </PaymenttypeBulkDeleteDialog>
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
                    checked={ids.length === paymenttypes.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(paymenttypes.map((paymenttype) => paymenttype.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Nama jenis pembayaran</TableHead>
            <TableHead>Default amount</TableHead>
            <TableHead>Waktu pembayaran</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymenttypes
            .filter((paymenttype) => JSON.stringify(paymenttype).toLowerCase().includes(cari.toLowerCase()))
            .map((paymenttype) => (
              <TableRow key={paymenttype.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(paymenttype.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, paymenttype.id]);
                          } else {
                            setIds(ids.filter((id) => id !== paymenttype.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{paymenttype.name}</TableCell>
                <TableCell>{formatRupiah(paymenttype.default_amount)}</TableCell>
                <TableCell>{paymenttype.billing_cycle}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('paymenttype.show', paymenttype.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <PaymenttypeFormSheet purpose="edit" paymenttype={paymenttype}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </PaymenttypeFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <PaymenttypeDeleteDialog paymenttype={paymenttype}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </PaymenttypeDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PaymenttypeList;
