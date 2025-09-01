import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [active] = useState(query.tab ?? 'material');
  return (
    <AppLayout title="Detail Lesson" description="Detail lesson">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.name}</CardTitle>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
      </Card>
      <Tabs value={active} onValueChange={(v) => router.get('', { tab: v })} className="space-y-6">
        <TabsList>
          <TabsTrigger value="material">Materi belajar</TabsTrigger>
          <TabsTrigger value="tugas">Daftar tugas</TabsTrigger>
          <TabsTrigger value="nilai">Nilai tugas</TabsTrigger>
          <TabsTrigger value="ujian">Nilai ujian</TabsTrigger>
        </TabsList>

        <TabsContent value="material">
          <LessonMaterialsTab materials={lesson.materials} />
        </TabsContent>
        <TabsContent value="tugas">
          <LessonTugasTab />
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
