import { User } from '.';
import { Activity } from './activity';

export type Extracurricular = {
  id: number;
  name: string;
  user_id: number;
  user: User;
  activities: Activity[];
  created_at?: string;
  updated_at?: string;
};
