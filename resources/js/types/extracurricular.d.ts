import { User } from '.';

export type Extracurricular = {
  id: number;
  name: string;
  user_id: number;
  user: User;
  created_at?: string;
  updated_at?: string;
};
