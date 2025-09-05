import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

const UserProfileWidget = () => {
  const {
    auth: { user, roles },
  } = usePage<SharedData>().props;
  return (
    <Card>
      <div className="flex justify-between">
        <CardHeader>
          <Avatar className="size-10">
            <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
          </Avatar>
        </CardHeader>
        <CardHeader className="flex-1 pl-0">
          <CardTitle className="line-clamp-1">{user.name}</CardTitle>
          <CardDescription>{roles.join(', ')}</CardDescription>
        </CardHeader>
      </div>
    </Card>
  );
};

export default UserProfileWidget;
