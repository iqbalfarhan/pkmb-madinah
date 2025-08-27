import { Paymenttype } from './paymenttype';
import { Student } from './student';

export type Bill = {
  id: number;
  student_id: number;
  payment_type_id: number;
  paid_date: string;
  description: string;
  total_amount: number;
  status: string;
  verified: boolean;
  student: Student;
  payment_type: Paymenttype;
  created_at?: string;
  updated_at?: string;
};
