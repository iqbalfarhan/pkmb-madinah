import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/types';
import { FC } from 'react';

type Props = {
  user: User;
};

const UserItemCard: FC<Props> = ({ user }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default UserItemCard;
