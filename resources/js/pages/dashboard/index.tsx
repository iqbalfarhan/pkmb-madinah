import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import DraftStudentsGrid from './components/draft-students-grid';
import BillWidget from './widgets/bill-widget';
import DateTimeWidget from './widgets/date-time-widget';
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
    permissions,
  } = usePage<SharedData>().props;
  return (
    <AppLayout title="Dashboard" description={`Selamat datang, kamu masuk sebagai ${roles.join(', ')}`} breadcrumbs={breadcrumbs}>
      <div className="grid gap-4 md:grid-cols-3">
        <UserProfileWidget />
        <DateTimeWidget />
        {permissions?.canOpenStudentBill && <BillWidget />}
        {permissions?.canOpenPayment && <UnverifiedPaymentWidget />}
        <div className="md:col-span-full">
          <PpdbCardWidget />
        </div>
      </div>
      <DraftStudentsGrid />
    </AppLayout>
  );
}
