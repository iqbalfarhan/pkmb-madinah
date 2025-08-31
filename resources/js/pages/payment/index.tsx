import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS, formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Payment } from '@/types/payment';
import { Link, router, usePage } from '@inertiajs/react';
import { CheckSquare, Edit, Filter, Folder, Image, Square, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import PaymentBulkDeleteDialog from './components/payment-bulk-delete-dialog';
import PaymentBulkEditSheet from './components/payment-bulk-edit-sheet';
import PaymentDeleteDialog from './components/payment-delete-dialog';
import PaymentEvidenceDialog from './components/payment-evidence-dialog';
import PaymentFilterSheet from './components/payment-filter-sheet';
import PaymentFormSheet from './components/payment-form-sheet';

type Props = {
  payments: Payment[];
  query: { [key: string]: string };
};

const PaymentList: FC<Props> = ({ payments, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Payments" description="Manage your payments">
      <div className="flex gap-2">
        <Input placeholder="Search payments..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <PaymentFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </PaymentFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <PaymentBulkEditSheet paymentIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </PaymentBulkEditSheet>
            <PaymentBulkDeleteDialog paymentIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </PaymentBulkDeleteDialog>
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
                    checked={ids.length === payments.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(payments.map((payment) => payment.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Tanggal bayar</TableHead>
            <TableHead>Bukti bayar</TableHead>
            <TableHead>Verifikasi</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments
            .filter((payment) => JSON.stringify(payment).toLowerCase().includes(cari.toLowerCase()))
            .map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(payment.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, payment.id]);
                          } else {
                            setIds(ids.filter((id) => id !== payment.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div>{payment.bill.student.name}</div>
                    <div className="text-muted-foreground">{payment.bill.description}</div>
                  </div>
                </TableCell>
                <TableCell>{formatRupiah(payment.amount)}</TableCell>
                <TableCell>{dateDFYHIS(payment.created_at)}</TableCell>
                <TableCell>
                  {(payment.media ?? []).length > 0 && (
                    <PaymentEvidenceDialog media={payment.media}>
                      <Button size={'icon'} variant={'secondary'}>
                        <Image />
                      </Button>
                    </PaymentEvidenceDialog>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant={payment.verified ? 'success' : 'ghost'}
                    size={'sm'}
                    onClick={() => {
                      const checked = !payment.verified;
                      router.put(
                        route('payment.update', payment.id),
                        { verified: checked },
                        {
                          preserveScroll: true,
                          onSuccess: () => toast.success(`Berhasil ${checked ? 'melakukan' : 'membatalkan'} verifikasi`),
                        },
                      );
                    }}
                  >
                    {payment.verified == true ? <CheckSquare /> : <Square />}
                    Verifikasi
                  </Button>
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('bill.show', payment.bill.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <PaymentFormSheet purpose="edit" payment={payment} billId={payment.bill_id}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </PaymentFormSheet>
                  )}
                  {permissions?.canDelete && (
                    <PaymentDeleteDialog payment={payment}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </PaymentDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PaymentList;
