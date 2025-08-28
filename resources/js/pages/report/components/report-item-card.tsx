import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Report } from '@/types/report';
import { router } from '@inertiajs/react';
import { FC } from 'react';

type Props = {
  report: Report;
};

const ReportItemCard: FC<Props> = ({ report }) => {
  return (
    <Card
      className="flex flex-col justify-between"
      onClick={() => {
        router.visit(route('report.show', report.id));
      }}
    >
      <CardHeader>
        <CardTitle>E-Rapor {report.report_type}</CardTitle>
        <CardDescription>{report.academic_year.label}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage src={report.student.avatar} />
          </Avatar>
          <span className="text-sm text-muted-foreground">{report.student.name}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportItemCard;
