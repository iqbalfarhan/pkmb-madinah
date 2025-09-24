import { Grade } from './grade';

export type Assessment = {
  id: number;
  group: string;
  name: string;
  grade_id: Grade['id'];
  semester: string;
  grade?: Grade;
  created_at?: string;
  updated_at?: string;
};
