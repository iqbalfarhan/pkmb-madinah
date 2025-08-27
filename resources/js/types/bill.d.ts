export type Bill = {
  id: number;
  student_id: number;
  payment_type_id: number;
  paid_date: string;
  description: string;
  total_amount: string;
  status: string;
  verified: string;
  created_at?: string;
  updated_at?: string;
};
