import BackButton from '@/components/back-button';
import HeadingSmall from '@/components/heading-small';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { FC } from 'react';
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
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>Memiliki akses sebagai {user.roles?.join(', ')}</CardDescription>
        </CardHeader>
      </Card>

      {(user.students ?? []).length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-full">
            <HeadingSmall title="Student" description={`Akun ini terhubung dengan ${user.students?.length} siswa`} />
          </div>
          {user.students?.map((s) => (
            <StudentItemCard key={s.id} student={s} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default ShowUser;
