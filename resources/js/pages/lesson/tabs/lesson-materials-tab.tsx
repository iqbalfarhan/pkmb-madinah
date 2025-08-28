import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MaterialFormSheet from '@/pages/material/components/material-form-sheet';
import MaterialItemCard from '@/pages/material/components/material-item-card';
import { Lesson } from '@/types/lesson';
import { Material } from '@/types/material';
import { usePage } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  materials: Material[];
};

const LessonMaterialsTab: FC<Props> = ({ materials }) => {
  const { lesson } = usePage<{ lesson: Lesson }>().props;
  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Materi belajar"
        description="Daftar materi yang digunakan dalam pembelajaran"
        actions={
          <div className="flex items-center gap-2">
            <Input placeholder="Cari materi" />
            <MaterialFormSheet purpose="create" lessonId={lesson.id}>
              <Button>Tambah materi baru</Button>
            </MaterialFormSheet>
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-4">
        {materials.map((m) => (
          <MaterialItemCard material={m} key={m.id} />
        ))}
      </div>
    </div>
  );
};

export default LessonMaterialsTab;
