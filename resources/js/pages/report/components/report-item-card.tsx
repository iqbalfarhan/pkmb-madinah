import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Folder } from 'lucide-react';
import { FC } from 'react';
import { Report } from '@/types/report';
import { Link } from '@inertiajs/react';
import ReportFormSheet from './report-form-sheet';
import ReportDeleteDialog from './report-delete-dialog';

type Props = {
  report: Report;
};

const ReportItemCard: FC<Props> = ({ report }) => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ report.name }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID: { report.id }
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href={route('report.show', report.id)}>
            <Folder />
          </Link>
        </Button>
        <ReportFormSheet purpose="edit" report={ report }>
          <Button variant="ghost" size="icon">
            <Edit />
          </Button>
        </ReportFormSheet>
        <ReportDeleteDialog report={ report }>
          <Button variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </ReportDeleteDialog>
      </CardFooter>
    </Card>
  );
};

export default ReportItemCard;
