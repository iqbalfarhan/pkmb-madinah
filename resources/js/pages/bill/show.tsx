import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFYHIS, formatRupiah } from '@/lib/utils';
import { SharedData } from '@/types';
import { Bill } from '@/types/bill';
import { Link, router, usePage } from '@inertiajs/react';
import { CheckSquare, Edit, Image, Plus, Square, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import PaymentDeleteDialog from '../payment/components/payment-delete-dialog';
import PaymentEvidenceDialog from '../payment/components/payment-evidence-dialog';
import PaymentFormSheet from '../payment/components/payment-form-sheet';
import BillStatusBadge from './components/bill-status-badge';

type Props = {
  bill: Bill;
};

const ShowBill: FC<Props> = ({ bill }) => {
  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout title="Detail Bill" description="Detail bill">
      <Card>
        <div className="flex flex-col md:flex-row">
          <CardHeader className="flex-1">
            <CardTitle>{bill.student.name}</CardTitle>
            <CardDescription>{bill.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="w-full md:w-80">
              <div className="flex gap-x-2">
                <div className="w-1/2">Total tagihan</div>
                <div>:</div>
                <div className="flex-1 text-right font-mono">{formatRupiah(bill.total_amount)}</div>
              </div>
              <div className="flex gap-x-2">
                <div className="w-1/2">Sudah dibayar</div>
                <div>:</div>
                <div className="flex-1 text-right font-mono">{formatRupiah(bill.total_paid)}</div>
              </div>
              <div className="flex gap-x-2">
                <div className="w-1/2">Sisa tagihan</div>
                <div>:</div>
                <div className="flex-1 text-right font-mono">{formatRupiah(bill.total_amount - bill.total_paid)}</div>
              </div>
            </div>
          </CardFooter>
        </div>
        <Separator />
        <CardFooter className="flex justify-between">
          <BillStatusBadge status={bill.status} />
          <Button asChild>
            <Link href={route(bill.student.status == 'ppdb' ? 'ppdb.show' : 'student.show', bill.student_id)}>Lihat detail siswa</Link>
          </Button>
        </CardFooter>
      </Card>

      <HeadingSmall
        title="Riwayat pembayaran"
        description="Daftar list pembayaran untuk tagihan ini"
        actions={
          <>
            {permissions?.canAdd && bill.status !== 'paid' && (
              <PaymentFormSheet purpose="create" billId={bill.id}>
                <Button>
                  <Plus />
                  Create new payment
                </Button>
              </PaymentFormSheet>
            )}
          </>
        }
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Kode transaksi</TableCell>
            <TableCell>Nominal bayar</TableCell>
            <TableCell>Tanggal input</TableCell>
            <TableCell>Bukti bayar</TableCell>
            <TableCell>Status verifikasi</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bill.payments.map((pay) => (
            <TableRow>
              <TableCell>{pay.code}</TableCell>
              <TableCell>{formatRupiah(pay.amount)}</TableCell>
              <TableCell>{dateDFYHIS(pay.created_at)}</TableCell>
              <TableCell>
                {(pay.media ?? []).length > 0 && (
                  <PaymentEvidenceDialog media={pay.media}>
                    <Button size={'sm'} variant={'secondary'}>
                      <Image />
                      Lihat bukti bayar
                    </Button>
                  </PaymentEvidenceDialog>
                )}
              </TableCell>
              <TableCell>
                {permissions?.canUpdate ? (
                  <Button
                    variant={pay.verified ? 'success' : 'ghost'}
                    size={'sm'}
                    onClick={() => {
                      const checked = !pay.verified;
                      router.put(
                        route('payment.update', pay.id),
                        { verified: checked },
                        {
                          preserveScroll: true,
                          onSuccess: () => toast.success(`Berhasil ${checked ? 'melakukan' : 'membatalkan'} verifikasi`),
                        },
                      );
                    }}
                  >
                    {pay.verified == true ? <CheckSquare /> : <Square />}
                    Verifikasi
                  </Button>
                ) : (
                  <div>{pay.verified ? 'Terverifikasi' : 'Belum diverifikasi'}</div>
                )}
              </TableCell>
              <TableCell>
                {permissions?.canUpdate && (
                  <PaymentFormSheet purpose="edit" payment={pay} billId={bill.id}>
                    <Button variant={'ghost'} size={'icon'} disabled={pay.verified}>
                      <Edit />
                    </Button>
                  </PaymentFormSheet>
                )}
                {permissions?.canDelete && (
                  <PaymentDeleteDialog payment={pay}>
                    <Button variant={'ghost'} size={'icon'} disabled={pay.verified}>
                      <Trash2 />
                    </Button>
                  </PaymentDeleteDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell />
            <TableCell>{formatRupiah(bill.total_paid)}</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </AppLayout>
  );
};

export default ShowBill;
