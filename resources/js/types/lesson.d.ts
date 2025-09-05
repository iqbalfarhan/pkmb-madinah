import { User } from '.';
import { Assignment } from './assignment';
import { Classroom } from './classroom';
import { Material } from './material';
import { Subject } from './subject';

export type Lesson = {
  id: number;
  name: string;
  description: string;
  classroom_id: number;
  subject_id: number;
  user_id: number;
  classroom: Classroom;
  subject: Subject;
  user: User;
  materials: Material[];
  assignments: Assignment[];
  created_at?: string;
  updated_at?: string;
};
