import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AssignmentItemCard from '@/pages/assignment/components/assignment-item-card';
import { Assignment } from '@/types/assignment';
import { FC } from 'react';

type Props = {
  assignments?: Assignment[];
  className?: string;
};

const ClassroomAssignmentWidget: FC<Props> = ({ assignments, className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Daftar tugas</CardTitle>
        <CardDescription>Tugas yang tersedia dikelas</CardDescription>
      </CardHeader>
      <CardContent>
        <Sheet>
          <SheetTrigger>
            <div className="flex items-center rounded-full border bg-secondary">
              <Avatar className="bg-muted text-muted-foreground">
                <AvatarFallback>{assignments?.length}</AvatarFallback>
              </Avatar>
              <Badge variant={'secondary'}>Lihat list tugas</Badge>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Daftar tugas</SheetTitle>
              <SheetDescription>Tugas yang tersedia dikelas</SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-full flex-1 overflow-x-auto px-4">
              <div className="space-y-2">
                {assignments?.map((a) => (
                  <AssignmentItemCard key={a.id} assignment={a} />
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default ClassroomAssignmentWidget;
