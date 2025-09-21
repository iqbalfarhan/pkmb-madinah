import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Student } from '@/types/student';
import { FC } from 'react';

type Props = {
  students?: Student[];
  className?: string;
};

const ClassroomStudentWidget: FC<Props> = ({ students, className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Anggota kelas</CardTitle>
        <CardDescription>{students?.length} students enrolled</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-wrap gap-1">
          {students?.map((student) => (
            <Avatar key={student.id}>
              <AvatarImage src={student.avatar || undefined} />
            </Avatar>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClassroomStudentWidget;
