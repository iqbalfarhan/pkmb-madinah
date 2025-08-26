import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import DraftStudentsGrid from './components/draft-students-grid';
import DateTimeWidget from './widgets/date-time-widget';
import PpdbCardWidget from './widgets/ppdb-card-widget';
import UserProfileWidget from './widgets/user-profile-widget';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const {
    auth: { roles },
  } = usePage<SharedData>().props;
  return (
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-2 gap-6">
        <UserProfileWidget />
        <DateTimeWidget />
        <div className="col-span-full">
          <PpdbCardWidget />
        </div>
      </div>
      <DraftStudentsGrid />
    </AppLayout>
  );
}
