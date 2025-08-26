import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import SubmitButton from '@/components/submit-button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { em } from '@/lib/utils';
import { SharedData } from '@/types';
import { Family } from '@/types/family';
import { Student } from '@/types/student';
import { useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';

const PpdbFamilyForm = () => {
  const {
    family,
    salaryLists = [],
    student,
    permissions,
  } = usePage<SharedData & { family?: Family; salaryLists: string[]; student: Student }>().props;

  const { data, setData, put, post } = useForm({
    student_id: family?.student_id ?? student.id,
    father_name: family?.father_name ?? '',
    father_ocupation: family?.father_ocupation ?? '',
    father_address: family?.father_address ?? '',
    father_phone: family?.father_phone ?? '',
    father_sallary: family?.father_sallary ?? '',
    mother_name: family?.mother_name ?? '',
    mother_ocupation: family?.mother_ocupation ?? '',
    mother_address: family?.mother_address ?? '',
    mother_phone: family?.mother_phone ?? '',
    mother_sallary: family?.mother_sallary ?? '',
  });

  const handleSubmit = () => {
    if (family) {
      put(route('family.update', family.id), {
        preserveScroll: true,
        onSuccess: () => toast.success('Data berhasil disimpan'),
        onError: (e) => toast.error(em(e)),
      });
    } else {
      post(route('family.store'), {
        preserveScroll: true,
        onSuccess: () => toast.success('Data berhasil disimpan'),
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <HeadingSmall title="Data orang tua" description="Informasi tentang ayah dan ibu" />
      </div>
      <div className="w-2/3 space-y-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <FormControl label="Nama ayah">
                <Input placeholder="Father name" value={data.father_name} onChange={(e) => setData('father_name', e.target.value)} />
              </FormControl>
              <FormControl label="Pekerjaan ayah">
                <Input placeholder="Father ocupation" value={data.father_ocupation} onChange={(e) => setData('father_ocupation', e.target.value)} />
              </FormControl>
              <FormControl label="Penghasilan ayah">
                <Select value={data.father_sallary} onValueChange={(value) => setData('father_sallary', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryLists.map((s, index) => (
                      <SelectItem key={index} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Nomor telepon ayah">
                <Input type="tel" placeholder="Father phone" value={data.father_phone} onChange={(e) => setData('father_phone', e.target.value)} />
              </FormControl>
              <FormControl label="Alamat ayah" className="col-span-full">
                <Textarea placeholder="Father address" value={data.father_address} onChange={(e) => setData('father_address', e.target.value)} />
              </FormControl>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <FormControl label="Nama ibu">
                <Input placeholder="Mother name" value={data.mother_name} onChange={(e) => setData('mother_name', e.target.value)} />
              </FormControl>
              <FormControl label="Pekerjaan ibu">
                <Input placeholder="Mother ocupation" value={data.mother_ocupation} onChange={(e) => setData('mother_ocupation', e.target.value)} />
              </FormControl>
              <FormControl label="Penghasilan ibu">
                <Select value={data.mother_sallary} onValueChange={(value) => setData('mother_sallary', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary" />
                  </SelectTrigger>
                  <SelectContent>
                    {salaryLists.map((s, index) => (
                      <SelectItem key={index} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormControl label="Nomor telepon ibu">
                <Input type="tel" placeholder="Mother phone" value={data.mother_phone} onChange={(e) => setData('mother_phone', e.target.value)} />
              </FormControl>
              <FormControl label="Alamat ibu" className="col-span-full">
                <Textarea placeholder="Mother address" value={data.mother_address} onChange={(e) => setData('mother_address', e.target.value)} />
              </FormControl>
            </div>
          </CardContent>
        </Card>

        {permissions?.canUpdate && (
          <Card>
            <CardContent>
              <SubmitButton onClick={handleSubmit} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PpdbFamilyForm;
