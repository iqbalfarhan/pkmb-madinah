import DDump from '@/components/d-dump';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { em } from '@/lib/utils';
import { SharedData, User } from '@/types';
import { Report, ReportDataMeta, ReportDoaHadistData } from '@/types/report';
import { useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { FC, useCallback } from 'react';
import { toast } from 'sonner';
import ReportHeader from '../components/report-header';
import ReportStudentCard from '../components/report-student-card';

type Props = {
  data: ReportDoaHadistData;
};

const ReportDoaHadist: FC<Props> = ({ data }) => {
  const { report, teachers = [] } = usePage<SharedData & { report: Report; teachers: User[] }>().props;
  const {
    data: formData,
    setData,
    put,
  } = useForm({
    data: data as ReportDoaHadistData,
  });

  const handleUpdate = useCallback(() => {
    put(route('report.update', report.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Rapor berhasil disimpan');
      },
      onError: (e) => toast.error(em(e)),
    });
  }, [put, report.id]);

  return (
    <>
      <ReportHeader />
      <Button onClick={handleUpdate} className="fixed right-6 bottom-6">
        <Check />
        Simpan
      </Button>
      <ReportStudentCard meta={data as ReportDataMeta} />
      <Card>
        <CardContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, dolorum. Perferendis ad temporibus saepe sit sed, cumque dolorem
          repellendus error adipisci quam quia dolore est recusandae. Id molestias fuga vel!
        </CardContent>
        <DDump content={formData} />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pilih guru pembimbing tahsin</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <Select defaultValue={data.pembimbing} onValueChange={(value) => setData('data.pembimbing', value)}>
            <SelectTrigger className="w-xs">
              <SelectValue placeholder="Pilih pembina" />
            </SelectTrigger>
            <SelectContent>
              {teachers.map((user) => (
                <SelectItem value={user.name}>{user.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  );
};

export default ReportDoaHadist;
