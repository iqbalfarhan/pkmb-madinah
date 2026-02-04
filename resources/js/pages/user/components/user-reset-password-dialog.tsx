import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { copyTextToClipboard, em, generatePassword } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { AlertCircle, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  user: User;
};

const UserResetPasswordDialog: FC<Props> = ({ children, user }) => {
  const [open, setOpen] = useState<boolean>(false)
  const { put, data, processing } = useForm({
    password: generatePassword(),
  });

  const handleSubmit = () => {
    put(route('user.reset-password', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Password user berhasil di ubah'),
        setOpen(false);
      },
      onError: (er) => toast.error(em(er)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>Reset password untuk {user.name}. klik password baru untuk copy kemudian kirimkan ke user.</DialogDescription>
        </DialogHeader>
        <div className="flex rounded border p-2">
          <Button variant={'ghost'} className="flex-1">
            <AlertCircle />
            Password baru user:
          </Button>
          <Button variant={'muted'} className="font-mono" onClick={() => copyTextToClipboard(data.password)}>
            {data.password}
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <SubmitButton onClick={() => handleSubmit()} loading={processing} disabled={processing} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserResetPasswordDialog;
