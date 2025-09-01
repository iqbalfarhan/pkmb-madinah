import { Assignment } from './assignment';
import { Classroom } from './classroom';
import { Material } from './material';
import { Subject } from './subject';
import { Teacher } from './teacher';

export type Lesson = {
  id: number;
  name: string;
  description: string;
  classroom_id: number;
  subject_id: number;
  teacher_id: number;
  classroom: Classroom;
  subject: Subject;
  teacher: Teacher;
  materials: Material[];
  assignments: Assignment[];
  created_at?: string;
  updated_at?: string;
};
