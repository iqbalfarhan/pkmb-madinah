import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Classroom } from '@/types/classroom';
import { router, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const ClassroomLayout: FC<Props> = ({ children }) => {
  const { tabname = '', classroom } = usePage<{ tabname: string; classroom: Classroom }>().props;

  const handleNavigate = (v: string) => {
    router.visit(route(`classroom.${v}`, classroom.id));
  };

  return (
    <AppLayout title="Detail Classroom" description="Detail classroom">
      <Card>
        <CardHeader>
          <CardTitle>{classroom.name}</CardTitle>
          <CardDescription>Walikelas: {classroom.user?.name}</CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue={tabname} onValueChange={(v) => handleNavigate(v)}>
        <TabsList>
          <TabsTrigger value="show">Overview</TabsTrigger>
          <TabsTrigger value="students">Siswa</TabsTrigger>
          <TabsTrigger value="lessons">Pelajaran</TabsTrigger>
          <TabsTrigger value="absents">Absents</TabsTrigger>
          <TabsTrigger value="rapors">E-repor</TabsTrigger>
          <TabsTrigger value="extracurricular">Ekskul</TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </AppLayout>
  );
};

export default ClassroomLayout;
