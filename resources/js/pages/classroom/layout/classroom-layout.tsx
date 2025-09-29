import SelectTab from '@/components/select-tab';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { router, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

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
  const { tabname = '', classroom } = usePage<SharedData & { tabname: string; classroom: Classroom }>().props;

  const handleNavigate = (v: string) => {
    router.visit(route(`classroom.${v}`, classroom.id));
  };

  return (
    <AppLayout title={classroom.name} description={classroom.description}>
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
