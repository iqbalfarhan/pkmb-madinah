import WidgetCard from '@/components/widget-card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { User } from 'lucide-react';

const UserProfileWidget = () => {
  const {
    auth: { user },
  } = usePage<SharedData>().props;
  return <WidgetCard icon={User} title={user.name} description={user.email} href={route('profile.edit')} />;
};

export default UserProfileWidget;
