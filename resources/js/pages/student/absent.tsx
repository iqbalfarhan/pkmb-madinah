import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Student } from '@/types/student';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { FC } from 'react';

type Props = {
  student: Student;
};

const StudentAbsentPage: FC<Props> = ({ student }) => {
  return (
    <AppLayout
      actions={
        <>
          <Button asChild>
            <Link href={route('student.show', student.id)}>
              <ChevronLeft />
              Kembali ke detail
            </Link>
          </Button>
        </>
      }
    >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas cupiditate aut nemo amet natus nisi sit, esse, corrupti impedit tenetur
      facilis quisquam numquam suscipit doloribus nesciunt dolores asperiores qui exercitationem?
    </AppLayout>
  );
};

export default StudentAbsentPage;
