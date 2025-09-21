import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { router, usePage } from '@inertiajs/react';
import { Edit } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import ClassroomFormSheet from '../components/classroom-form-sheet';

type Props = PropsWithChildren & {};

const menuLists: { value: string; label: string }[] = [
  {
    value: 'show',
    label: 'Overview',
  },
  {
    value: 'students',
    label: 'Siswa',
  },
  {
    value: 'lessons',
    label: 'Pelajaran',
  },
  {
    value: 'absents',
    label: 'Ketidakhadiran',
  },
  {
    value: 'rapors',
    label: 'E-repor',
  },
  {
    value: 'extracurricular',
    label: 'Ekskul',
  },
];

const ClassroomLayout: FC<Props> = ({ children }) => {
  const { tabname = '', classroom, permissions } = usePage<SharedData & { tabname: string; classroom: Classroom }>().props;

  const handleNavigate = (v: string) => {
    router.visit(route(`classroom.${v}`, classroom.id));
  };

  return (
    <AppLayout
      title="Detail Classroom"
      description="Detail classroom"
      actions={
        <>
          {permissions?.canUpdate && (
            <ClassroomFormSheet purpose="edit" classroom={classroom}>
              <Button>
                <Edit /> Edit kelas
              </Button>
            </ClassroomFormSheet>
          )}
        </>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>{classroom.name}</CardTitle>
          <CardDescription>Walikelas: {classroom.user?.name}</CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter>
          <div className="flex flex-wrap gap-1 md:hidden">
            {menuLists.map((ml) => (
              <Button size={'sm'} variant={tabname === ml.value ? 'default' : 'outline'} key={ml.value} onClick={() => handleNavigate(ml.value)}>
                {ml.label}
              </Button>
            ))}
          </div>
          <Tabs defaultValue={tabname} onValueChange={(v) => handleNavigate(v)} className="hidden h-fit md:flex">
            <TabsList className="flex flex-wrap">
              {menuLists.map((ml) => (
                <TabsTrigger value={ml.value} key={ml.value}>
                  {ml.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardFooter>
      </Card>
      {children}
    </AppLayout>
  );
};

export default ClassroomLayout;
