import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';

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
        <CardFooter>
          <Button variant={'outline'}>
            <Settings />
            Edit Profile
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default UserProfileWidget;
