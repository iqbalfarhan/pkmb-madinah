import { User } from '.';
import { Academicyear } from './academicyear';
import { Assignment } from './assignment';
import { Grade } from './grade';
import { Lesson } from './lesson';
import { Student } from './student';

export type Classroom = {
  id: number;
  name: string;
  academic_year_id: number;
  user_id: number | null;
  grade_id: number;
  academic_year: Academicyear;
  user?: User;
  students?: Student[];
  lessons?: Lesson[];
  assignments?: Assignment[];
  grade: Grade;
  description: string;
  created_at?: string;
  updated_at?: string;
};
