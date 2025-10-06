import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import DraftStudentsGrid from './components/draft-students-grid';
import AcademicYearWidget from './widgets/academic-year-widget';
import BillWidget from './widgets/bill-widget';
import PpdbCardWidget from './widgets/ppdb-card-widget';
import UnverifiedPaymentWidget from './widgets/unverified-payment-widget';
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
    // permissions,
  } = usePage<SharedData>().props;
  return (
    <AppLayout title="Dashboard" description={`Selamat datang, Anda masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <UserProfileWidget />
        <BillWidget />
        <UnverifiedPaymentWidget />
        <AcademicYearWidget />
      </div>
      <PpdbCardWidget />
      <DraftStudentsGrid />
    </AppLayout>
  );
}
