import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Assignment } from '@/types/assignment';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';

type Props = {
  assignment: Assignment;
};

const AssignmentItemCard: FC<Props> = ({ assignment }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="leading-normal">{assignment.name}</CardTitle>
        <CardDescription>{assignment.lesson.name}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <Button size={'icon'} variant={'ghost'} disabled></Button>
        <Button asChild>
          <Link href={route('assignment.show', assignment.id)}>
            Detail tugas <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentItemCard;
