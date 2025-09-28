import WidgetCard from '@/components/widget-card';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Calendar } from 'lucide-react';

const AcademicYearWidget = () => {
  const { activeAcademicYear: active } = usePage<SharedData>().props;

  return <WidgetCard variant={'info'} icon={Calendar} title={`Tahun ajaran ${active.year}`} description={`Semester ${active.semester}`} />;
};

export default AcademicYearWidget;
