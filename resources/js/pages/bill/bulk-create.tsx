import BackButton from '@/components/back-button';
import DDump from '@/components/d-dump';
import FormControl from '@/components/form-control';
import MoneyInput from '@/components/money-input';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { em, groupBy } from '@/lib/utils';
import { Classroom } from '@/types/classroom';
import { Paymenttype } from '@/types/paymenttype';
import { Student } from '@/types/student';
import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';

type Props = {
  students: Student[];
  paymenttypes: Paymenttype[];
  classrooms: Classroom[];
};

const BillBulkCreate: FC<Props> = ({ students = [], paymenttypes = [], classrooms = [] }) => {
  const { data, setData, post, processing } = useForm({
    student_ids: [] as number[],
    payment_type_id: '',
    amount: 0 as number | undefined,
    description: '',
  });

  const handleCreateBills = () => {
    post(route('bill.bulk.create'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Berhasil membuat beberapa tagihan'),
      onError: (e) => toast.error(em(e)),
    });
  };

  const groupedStudents = groupBy(students, 'classroom_id');

  return (
    <AppLayout
      title="Buat tagihan sekaligus"
      description="Buat tagihan sekaligus untuk banyak siswa"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      {/* <DDump content={groupedStudents} /> */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pilih siswa</CardTitle>
            <CardDescription>Pilih siswa dari list berikut ini</CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="space-x-2">
              <Checkbox
                checked={data.student_ids.length === students.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setData(
                      'student_ids',
                      students.map((student) => student.id),
                    );
                  } else {
                    setData('student_ids', []);
                  }
                }}
              />
              <span>Pilih semua siswa</span>
            </Label>
          </CardContent>
          <Separator />
          <CardContent>
            <div className="grid gap-6">
              {Object.entries(groupedStudents).map(([kelas_id, siswas]) => {
                const classroomName = classrooms.find((cl) => cl.id === Number(kelas_id));
                return (
                  <div className="grid gap-4">
                    <h2>{classroomName?.name}</h2>
                    {siswas.map((student) => (
                      <Label className="space-x-2">
                        <Checkbox
                          value={student.id}
                          checked={data.student_ids.includes(student.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setData('student_ids', [...data.student_ids, student.id]);
                            } else {
                              setData(
                                'student_ids',
                                data.student_ids.filter((id) => id !== student.id),
                              );
                            }
                          }}
                        />
                        <span>{student.name}</span>
                      </Label>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informasi tagihan</CardTitle>
            <CardDescription>Isi jenis tagihan dan deskripsi tagihan</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <FormControl label="Pilih jenis pembayaran">
                <Select
                  value={data.payment_type_id.toString()}
                  onValueChange={(value) => {
                    setData('payment_type_id', value);
                    const tipe = paymenttypes.find((pt) => pt.id === Number(value));
                    setData('amount', tipe?.default_amount);
                    setData('description', `Tagihan untuk pembayaran ${tipe?.name}`);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis tagihan" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymenttypes.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Nominal pembayaran">
                <MoneyInput value={data.amount ? data.amount : 0} onValueChange={(value) => (value ? setData('amount', Number(value)) : undefined)} />
              </FormControl>
              <FormControl label="Deskripsi" className="lg:col-span-full">
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
              </FormControl>
            </div>

            <DDump content={data} />
          </CardContent>
          <CardFooter>
            <SubmitButton icon={ArrowRight} onClick={handleCreateBills} label="Buat tagihan" loading={processing} />
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BillBulkCreate;
