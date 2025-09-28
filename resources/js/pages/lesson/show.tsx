import SelectTab from '@/components/select-tab';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Lesson } from '@/types/lesson';
import { router } from '@inertiajs/react';
import { FC, useState } from 'react';
import LessonMaterialsTab from './tabs/lesson-materials-tab';
import LessonNilaiTab from './tabs/lesson-nilai-tab';
import LessonTugasTab from './tabs/lesson-tugas-tab';
import LessonUjianTab from './tabs/lesson-ujian-tab';

type Props = {
  lesson: Lesson;
  query: Record<string, string>;
};

const ShowLesson: FC<Props> = ({ lesson, query }) => {
  const [active, setActive] = useState(query.tab ?? 'material');
  return (
    <AppLayout title={lesson.name} description={lesson.description}>
      <Tabs value={active} onValueChange={(v) => router.get('', { tab: v })} className="space-y-6">
        <SelectTab
          value={active}
          onValueChange={(value) => {
            router.get('', { tab: value });
            setActive(value);
          }}
          options={[
            {
              title: 'Materi belajar',
              href: 'material',
            },
            {
              title: 'Jurnal',
              href: 'jurnal',
            },
            {
              title: 'Prakarya',
              href: 'prakarya',
            },
            {
              title: 'Nilai tugas',
              href: 'nilai',
            },
            {
              title: 'Nilai evaluasi',
              href: 'ujian',
            },
          ]}
        />

        <TabsContent value="material">
          <LessonMaterialsTab materials={lesson.materials} />
        </TabsContent>
        <TabsContent value="jurnal">
          <LessonTugasTab type="jurnal" />
        </TabsContent>
        <TabsContent value="prakarya">
          <LessonTugasTab type="prakarya" />
        </TabsContent>
        <TabsContent value="nilai">
          <LessonNilaiTab />
        </TabsContent>
        <TabsContent value="ujian">
          <LessonUjianTab />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default ShowLesson;
