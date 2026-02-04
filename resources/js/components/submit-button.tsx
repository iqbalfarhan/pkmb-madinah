import { Check, LucideIcon } from 'lucide-react';
import { FC } from 'react';
import { Button } from './ui/button';
import { Spinner } from './ui/spinner';

type Props = {
  label?: string;
  icon?: LucideIcon | null;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const SubmitButton: FC<Props> = ({ label, icon: Icon, loading, ...props }) => {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? <Spinner /> : Icon ? <Icon /> : <Check />}
      {label ?? 'Submit'}
    </Button>
  );
};

export default SubmitButton;
