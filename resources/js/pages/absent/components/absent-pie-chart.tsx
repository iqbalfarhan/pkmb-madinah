import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { groupBy } from '@/lib/utils';
import { Absent } from '@/types/absent';
import { Academicyear } from '@/types/academicyear';
import { Link, usePage } from '@inertiajs/react';
import { FC } from 'react';

export const description = 'A simple pie chart';

const chartConfig: ChartConfig = {
  sakit: {
    label: 'Sakit',
    color: 'var(--warning)',
  },
  izin: {
    label: 'Izin',
    color: 'var(--success)',
  },
  'tanpa keterangan': {
    label: 'Tanpa keterangan',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig;

type Props = {
  absents: Absent[];
  href?: string;
  className?: string;
};

const AbsentPieChart: FC<Props> = ({ absents = [], href, className }) => {
  const { activeAcademicYear } = usePage<{ activeAcademicYear: Academicyear | null }>().props;

  const newAbsents = absents.filter((a) => (activeAcademicYear ? a.academic_year_id === activeAcademicYear.id : false));

  const chartData = Object.entries(groupBy(newAbsents, 'reason')).map(([key, value]) => ({
    reason: key,
    count: value.length,
    fill: chartConfig[key as keyof ChartConfig]?.color,
  }));

  return (
    <Card className={` ${className}`}>
      <Link href={href}>
        <CardHeader>
          <CardTitle>Ketidakhadiran siswa</CardTitle>
          <CardDescription>{activeAcademicYear?.label}</CardDescription>
        </CardHeader>
        {absents.length > 0 && (
          <CardContent className="flex-1 pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="count" nameKey="reason" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        )}
      </Link>
    </Card>
  );
};

export default AbsentPieChart;
