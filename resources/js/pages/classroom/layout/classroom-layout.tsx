import SelectTab from '@/components/select-tab';
import AppLayout from '@/layouts/app-layout';
import { NavItem, SharedData } from '@/types';
import { Classroom } from '@/types/classroom';
import { router, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {};

const menuLists: NavItem[] = [
  {
    href: 'show',
    title: 'Overview',
  },
  {
    href: 'students',
    title: 'Siswa',
  },
  {
    href: 'lessons',
    title: 'Pelajaran',
  },
  {
    href: 'absents',
    title: 'Ketidakhadiran',
  },
  {
    href: 'rapors',
    title: 'E-rapor',
  },
  {
    href: 'extracurricular',
    title: 'Kegiatan ekskul',
  },
  // {
  //   href: 'scores',
  //   title: 'Nilai siswa',
  // },
];

const ClassroomLayout: FC<Props> = ({ children }) => {
  const { tabname = '', classroom } = usePage<SharedData & { tabname: string; classroom: Classroom }>().props;

  const handleNavigate = (v: string) => {
    router.visit(route(`classroom.${v}`, classroom.id));
  };

  return (
    <AppLayout title={classroom.name} description={classroom.description}>
      <SelectTab value={tabname} onValueChange={(v) => handleNavigate(v)} options={menuLists} />
      {children}
    </AppLayout>
  );
};

export default ClassroomLayout;
