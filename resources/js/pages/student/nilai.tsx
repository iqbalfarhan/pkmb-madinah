import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

const StudentNilaiTab = () => {
  return (
    <AppLayout title="Nilai Siswa" description="Halaman nilai siswa">
      <div className="flex items-start justify-start gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matematika">Matematika</SelectItem>
            <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
            <SelectItem value="ipa">IPA</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Pilih pelajaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matematika">Matematika</SelectItem>
            <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
            <SelectItem value="ipa">IPA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AppLayout>
  );
};

export default StudentNilaiTab;
