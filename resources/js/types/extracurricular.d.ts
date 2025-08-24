import { Teacher } from './teacher';

export type Extracurricular = {
  id: number;
  name: string;
  teacher_id: number;
  teacher: Teacher;
  created_at?: string;
  updated_at?: string;
};
