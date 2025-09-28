import SelectTab from '@/components/select-tab';
import { Button } from '@/components/ui/button';
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
      title={classroom.name}
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
      <SelectTab
        value={tabname}
        onValueChange={(v) => handleNavigate(v)}
        options={menuLists.map((item) => ({
          title: item.label,
          href: item.value,
        }))}
      />
      {children}
    </AppLayout>
  );
};

export default ClassroomLayout;
