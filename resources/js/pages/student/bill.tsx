import BackButton from '@/components/back-button';
import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah, strLimit } from '@/lib/utils';
import { SharedData } from '@/types';
import { Bill } from '@/types/bill';
import { Paymenttype } from '@/types/paymenttype';
import { Student } from '@/types/student';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Folder, Plus, X } from 'lucide-react';
import { FC } from 'react';
import BillFormSheet from '../bill/components/bill-form-sheet';
import BillStatusBadge from '../bill/components/bill-status-badge';

type Props = {
  student: Student;
  bills: Bill[];
};

const StudentBillLists: FC<Props> = ({ student, bills }) => {
  const {
    permissions,
    statusLists = [],
    paymentTypes = [],
  } = usePage<
    SharedData & {
      statusLists: string[];
      paymentTypes: Paymenttype[];
    }
  >().props;
  const { data, setData, reset } = useForm({
    status: '',
    payment_type_id: '',
  });
  return (
    <AppLayout
      title={`Tagihan ${student.name}`}
      description={'Daftar tagihan siswa'}
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <FormControl label="Jenis pembayaran">
              <Select value={data.payment_type_id} onValueChange={(value) => setData('payment_type_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih jenis pembayaran'} />
                </SelectTrigger>
                <SelectContent>
                  {paymentTypes.map((type) => (
                    <SelectItem value={type.id.toString()} key={type.id}>
                      {type.name} ({type.billing_cycle})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Status pembayaran">
              <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={'Pilih status pembayaran'} />
                </SelectTrigger>
                <SelectContent>
                  {statusLists.map((tugas) => (
                    <SelectItem value={tugas} key={tugas}>
                      {tugas}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </div>
        </CardContent>
        <Separator />
        <CardContent>
          <div className="flex justify-between gap-2">
            <Button variant={'destructive'} onClick={() => reset()} disabled={!data.status && !data.payment_type_id}>
              <X />
              Reset pencarian
            </Button>

            {permissions?.canAdd && (
              <BillFormSheet purpose="create">
                <Button>
                  <Plus />
                  Buat tagihan baru
                </Button>
              </BillFormSheet>
            )}
          </div>
        </CardContent>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Pembayaran</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Nominal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills
            .filter((pt) => (data.payment_type_id ? data.payment_type_id.toString() === pt.payment_type_id.toString() : true))
            .filter((s) => (data.status ? data.status.toString() === s.status.toString() : true))
            .map((bill, index) => (
              <TableRow key={bill.id}>
                <TableCell className="w-fit text-center">
                  <Button size={'icon'} variant={'ghost'} disabled>
                    {index + 1}
                  </Button>
                </TableCell>
                <TableCell>{bill.student.name}</TableCell>
                <TableCell>{bill.payment_type.name}</TableCell>
                <TableCell>{strLimit(bill.description)}</TableCell>
                <TableCell>{formatRupiah(bill.total_amount)}</TableCell>
                <TableCell>
                  <BillStatusBadge status={bill.status} />
                </TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'} asChild>
                      <Link href={route('bill.show', bill.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default StudentBillLists;
