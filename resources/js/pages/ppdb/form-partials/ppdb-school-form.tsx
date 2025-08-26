import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PpdbSchoolForm = () => {
  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <HeadingSmall title="Sekolah sebelumnya" description="Informasi tentang sekolah sebelumnya. Kosongkan bila tidak ada." />
      </div>
      <div className="w-2/3 space-y-6">
        <Card>
          <CardContent>
            <div className="grid gap-6">
              <FormControl label="Nama sekolah">
                <Input placeholder="Nama sekolah sebelumnya" />
              </FormControl>
              <FormControl label="Alamat sekolah">
                <Textarea placeholder="Alamat sekolah sebelumnya" className="h-24" />
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PpdbSchoolForm;
