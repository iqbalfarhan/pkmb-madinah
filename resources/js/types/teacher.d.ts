import { User } from '.';
import { Classroom } from './classroom';
import { Lesson } from './lesson';

export type Teacher = {
  id: number;
  name: string;
  email: string;
  gender: boolean;
  phone: string;
  avatar: string;
  user: User;
  classrooms: Classroom[];
  lessons: Lesson[];
  created_at?: string;
  updated_at?: string;
};
