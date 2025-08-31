import { Media } from '.';
import { Bill } from './bill';

export type Payment = {
  id: number;
  bill_id: number;
  bill: Bill;
  amount: number;
  remark: string;
  code: string;
  media: Media[];
  verified: boolean;
  created_at: string;
  updated_at?: string;
};
