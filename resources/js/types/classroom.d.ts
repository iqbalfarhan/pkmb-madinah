import { Academicyear } from './academicyear';
import { Grade } from './grade';
import { Lesson } from './lesson';
import { Student } from './student';
import { Teacher } from './teacher';

export type Classroom = {
  id: number;
  name: string;
  academic_year_id: number;
  teacher_id: number | null;
  grade_id: number;
  academic_year: Academicyear;
  teacher?: Teacher;
  students?: Student[];
  lessons?: Lesson[];
  grade: Grade;
  description: string;
  created_at?: string;
  updated_at?: string;
};
