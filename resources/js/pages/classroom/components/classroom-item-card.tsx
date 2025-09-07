import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Classroom } from '@/types/classroom';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  classroom: Classroom;
  href?: string;
};

const ClassroomItemCard: FC<Props> = ({ classroom, href = '' }) => {
  return (
    <Card className="flex cursor-pointer flex-col justify-between hover:opacity-50" onClick={() => router.visit(href)}>
      <CardHeader>
        <CardTitle>{classroom.name}</CardTitle>
        <CardDescription className="line-clamp-2">{classroom.description}</CardDescription>
      </CardHeader>
      <CardFooter className="gap-1.5">
        <Badge variant="default">{classroom.students?.length} siswa</Badge>
        <Badge variant="default">{classroom.lessons?.length} Pelajaran</Badge>
      </CardFooter>
      {classroom.user && (
        <>
          <Separator />
          <CardFooter>
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={classroom.user?.avatar} />
              </Avatar>
              <div className="text-sm">{classroom.user?.name}</div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default ClassroomItemCard;
