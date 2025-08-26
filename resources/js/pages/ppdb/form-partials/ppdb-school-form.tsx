import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Prevschool } from '@/types/prevschool';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const PpdbSchoolForm = () => {
  const { prevschool, student, permissions } = usePage<SharedData & { prevschool?: Prevschool; student: Student }>().props;

  const { data, setData, processing, post, put } = useForm({
    student_id: student.id,
    name: prevschool?.name ?? '',
    address: prevschool?.address ?? '',
  });

  const handleSubmit = () => {
    if (prevschool) {
      put(route('prevschool.update', prevschool.id), {
        preserveScroll: true,
        onSuccess: () => toast.success('Berhasil memperbarui data sekolah sebelumnya'),
        onError: (e) => toast.error(em(e)),
      });
    } else {
      post(route('prevschool.store'), {
        preserveScroll: true,
        onSuccess: () => toast.success('Berhasil menambahkan data sekolah sebelumnya'),
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <HeadingSmall title="Sekolah sebelumnya" description="Informasi tentang sekolah sebelumnya. Dapat dikosongkan bila tidak ada." />
      </div>
      <div className="w-2/3 space-y-6">
        <Card>
          <CardContent>
            <div className="grid gap-6">
              <FormControl label="Nama sekolah">
                <Input placeholder="Nama sekolah sebelumnya" value={data.name} onChange={(e) => setData('name', e.target.value)} />
              </FormControl>
              <FormControl label="Alamat sekolah">
                <Textarea
                  placeholder="Alamat sekolah sebelumnya"
                  className="h-24"
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                />
              </FormControl>
            </div>
          </CardContent>
          {permissions?.canUpdate && (
            <>
              <Separator />
              <CardFooter>
                <SubmitButton onClick={handleSubmit} loading={processing} />
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PpdbSchoolForm;
