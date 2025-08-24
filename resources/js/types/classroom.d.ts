import { Academicyear } from './academicyear';
import { Grade } from './grade';
import { Teacher } from './teacher';

export type Classroom = {
  id: number;
  name: string;
  academic_year_id: number;
  teacher_id: number | null;
  grade_id: number;
  academic_year: Academicyear;
  teacher?: Teacher;
  grade: Grade;
  created_at?: string;
  updated_at?: string;
};
