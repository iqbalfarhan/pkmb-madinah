import { Classroom } from './classroom';
import { Subject } from './subject';
import { Teacher } from './teacher';

export type Lesson = {
  id: number;
  name: string;
  classroom_id: number;
  subject_id: number;
  teacher_id: number;
  classroom: Classroom;
  subject: Subject;
  teacher: Teacher;
  created_at?: string;
  updated_at?: string;
};
