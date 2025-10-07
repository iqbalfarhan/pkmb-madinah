import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Report } from '@/types/report';
import { Link, router, usePage } from '@inertiajs/react';
import { Copy, Edit, Folder, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import ReportDeleteDialog from './report-delete-dialog';
import ReportFormSheet from './report-form-sheet';

type Props = {
  report: Report;
};

const ReportItemCard: FC<Props> = ({ report }) => {
  const [openMore, setopenMore] = useState(false);
  const { permissions } = usePage<SharedData>().props;
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        onClick={() => {
          router.visit(route('report.show', report.id));
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setopenMore((prev) => !prev);
        }}
        className="h-full"
      >
        <CardTitle>E-Rapor {report.report_type}</CardTitle>
        <CardDescription>{`${report.academic_year.year} - semester ${report.semester}`}</CardDescription>
      </CardHeader>
      <Separator />
      {openMore ? (
        <CardFooter className="flex justify-between space-x-1">
          <div className="flex gap-1">
            {permissions?.canShow && (
              <Button variant={'outline'} size={'icon'} asChild>
                <Link href={route('report.show', report.id)}>
                  <Folder />
                </Link>
              </Button>
            )}
            {permissions?.canUpdate && (
              <>
                <ReportFormSheet report={report} purpose="duplicate">
                  <Button variant={'outline'} size={'icon'}>
                    <Copy />
                  </Button>
                </ReportFormSheet>
                <Button variant={'outline'} size={'icon'} asChild>
                  <Link href={route('report.edit', report.id)}>
                    <Edit />
                  </Link>
                </Button>
              </>
            )}
          </div>
          {permissions?.canDeleteReport && (
            <ReportDeleteDialog report={report}>
              <Button variant={'outline'} size={'icon'}>
                <Trash2 />
              </Button>
            </ReportDeleteDialog>
          )}
        </CardFooter>
      ) : (
        <CardContent className="flex justify-between" onClick={() => setopenMore(false)}>
          <Button variant={'ghost'} className="px-0">
            <Avatar className="size-5">
              <AvatarImage src={report.student.avatar} />
            </Avatar>
            <span className="text-sm text-muted-foreground">{report.student.name}</span>
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ReportItemCard;
