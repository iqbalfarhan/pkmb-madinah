import HeadingSmall from '@/components/heading-small';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Teacher } from '@/types/teacher';
import { FC } from 'react';
import ClassroomItemCard from '../classroom/components/classroom-item-card';
import LessonItemCard from '../lesson/components/lesson-item-card';
import UserItemCard from '../user/components/user-item-card';

type Props = {
  teacher: Teacher;
  roles: string[];
};

const ShowTeacher: FC<Props> = ({ teacher, roles }) => {
  return (
    <AppLayout title="Detail Teacher" description="Detail teacher">
      <Card>
        <CardHeader>
          <CardTitle>{teacher.name}</CardTitle>
          <CardDescription>Memiliki akses sebagai {roles.join(', ')}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid-responsive grid gap-4">
        <div className="col-span-full">
          <HeadingSmall title="User" description="User yang terhubung dengan guru ini" />
        </div>
        <UserItemCard user={teacher.user} />
      </div>

      <div className="grid-responsive grid gap-4">
        <div className="col-span-full">
          <HeadingSmall title="Kelas" description="Kelas yang terhubung dengan guru ini" />
        </div>
        {teacher.classrooms.map((c) => (
          <ClassroomItemCard key={c.id} classroom={c} />
        ))}
      </div>

      <div className="grid-responsive grid gap-4">
        <div className="col-span-full">
          <HeadingSmall title="Pelajaran" description="Pelajaran yang terhubung dengan guru ini" />
        </div>
        {teacher.lessons.map((l) => (
          <LessonItemCard key={l.id} lesson={l} />
        ))}
      </div>
    </AppLayout>
  );
};

export default ShowTeacher;
