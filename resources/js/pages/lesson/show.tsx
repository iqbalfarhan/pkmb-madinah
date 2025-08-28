import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Lesson } from '@/types/lesson';
import { FC, useState } from 'react';
import LessonMaterialsTab from './tabs/lesson-materials-tab';
import LessonNilaiTab from './tabs/lesson-nilai-tab';
import LessonTugasTab from './tabs/lesson-tugas-tab';

type Props = {
  lesson: Lesson;
};

const ShowLesson: FC<Props> = ({ lesson }) => {
  const [active, setActive] = useState('material');
  return (
    <AppLayout title="Detail Lesson" description="Detail lesson">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.name}</CardTitle>
          <CardDescription>{lesson.description}</CardDescription>
        </CardHeader>
      </Card>
      <Tabs value={active} onValueChange={setActive} className="space-y-6">
        <TabsList>
          <TabsTrigger value="material">Materi belajar</TabsTrigger>
          <TabsTrigger value="tugas">Daftar penilaian</TabsTrigger>
          <TabsTrigger value="nilai">Nilai siswa</TabsTrigger>
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
      </Tabs>
    </AppLayout>
  );
};

export default ShowLesson;
