import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lesson } from '@/types/lesson';
import { FC } from 'react';

type Props = {
  lessons?: Lesson[];
};

const ClassroomLessonsWidget: FC<Props> = ({ lessons }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengajar matapelajaran</CardTitle>
        <CardDescription>Mengajar di {lessons?.length} Pelajaran</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from(
            new Map(
              lessons?.flatMap((l) => l.user).map((t) => [t.id, t]), // key = id
            ).values(),
          ).map((user) => (
            <Avatar key={user.id}>
              <AvatarImage src={user.avatar || undefined} />
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassroomLessonsWidget;
