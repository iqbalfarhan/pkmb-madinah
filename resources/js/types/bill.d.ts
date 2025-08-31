import { Payment } from './payment';
import { Paymenttype } from './paymenttype';
import { Student } from './student';

export type BillStatus = 'unpaid' | 'partial' | 'paid';

export type Bill = {
  id: number;
  student_id: number;
  payment_type_id: number;
  paid_date: string;
  description: string;
  total_amount: number;
  status: BillStatus;
  verified: boolean;
  student: Student;
  payment_type: Paymenttype;
  payments: Payment[];
  total_paid: number;
  created_at: string;
  updated_at?: string;
};
