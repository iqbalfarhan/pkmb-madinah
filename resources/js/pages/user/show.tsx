import BackButton from '@/components/back-button';
import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { FC } from 'react';
import ClassroomItemCard from '../classroom/components/classroom-item-card';
import LessonItemCard from '../lesson/components/lesson-item-card';
import StudentItemCard from '../student/components/student-item-card';

type Props = {
  user: User;
};

const ShowUser: FC<Props> = ({ user }) => {
  return (
    <AppLayout
      title="Detail User"
      description="Detail user"
      actions={
        <>
          <BackButton />
        </>
      }
    >
      <Card>
        <div className="flex">
          <CardHeader>
            <Avatar className="size-9">
              <AvatarImage src={user.avatar} />
            </Avatar>
          </CardHeader>
          <CardHeader className="pl-0">
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>Memiliki akses sebagai {user.role_lists?.join(', ')}</CardDescription>
          </CardHeader>
        </div>
      </Card>

      {(user.students ?? []).length > 0 && (
        <div className="grid-responsive grid gap-4">
          <div className="col-span-full">
            <HeadingSmall title="Student" description={`Akun ini terhubung dengan ${user.students?.length} siswa`} />
          </div>
          {user.students?.map((s) => (
            <StudentItemCard key={s.id} student={s} />
          ))}
        </div>
      )}

      {(user.classrooms ?? []).length > 0 && (
        <div className="grid-responsive grid gap-4">
          <div className="col-span-full">
            <HeadingSmall title="Walikelas" description={`Akun ini merupakan walikelas dari ${user.classrooms?.length} kelas`} />
          </div>
          {user.classrooms?.map((s) => (
            <ClassroomItemCard key={s.id} classroom={s} />
          ))}
        </div>
      )}

      {(user.lessons ?? []).length > 0 && (
        <div className="grid-responsive grid gap-4">
          <div className="col-span-full">
            <HeadingSmall title="Matapelajaran" description={`Akun ini merupakan guru matapelajaran ${user.lessons?.length} mata pelajaran`} />
          </div>
          {user.lessons?.map((s) => (
            <LessonItemCard key={s.id} lesson={s} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default ShowUser;
