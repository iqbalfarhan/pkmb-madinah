import { User } from '.';
import { Classroom } from './classroom';
import { Family } from './family';
import { Grade } from './grade';

export type Student = {
  id: number;
  nisn: string;
  nis: string;
  name: string;
  gender: boolean;
  status: string;
  address: string;
  grade_id: number;
  classroom_id: number;
  phone: string;
  email: string;
  pob: string;
  dob: string;
  user_id: number;
  grade?: Grade;
  classroom?: Classroom;
  user?: User;
  kelahiran: string;
  umur: number;
  family?: Family;
  created_at: string;
  updated_at?: string;
};
