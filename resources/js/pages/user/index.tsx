import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Key, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import UserBulkDeleteDialog from './components/user-bulk-delete.dialog';
import UserBulkEditSheet from './components/user-bulk-edit-sheet';
import UserDeleteDialog from './components/user-delete-dialog';
import UserFilterSheet from './components/user-filter-sheet';
import UserFormSheet from './components/user-form-sheet';
import UserResetPasswordDialog from './components/user-reset-password-dialog';

type Props = {
  users: User[];
  query: { [key: string]: string };
};

const UserList: FC<Props> = ({ users, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title="Pengguna aplikasi"
      description="Pengaturan user"
      actions={
        <>
          <UserFormSheet purpose="create">
            <Button>
              <Plus />
              Create new user
            </Button>
          </UserFormSheet>
          <Button asChild size={'icon'} variant={'destructive'}>
            <Link href={route('user.archived')}>
              <FolderArchive />
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search users..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <UserFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </UserFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <UserBulkEditSheet userIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </UserBulkEditSheet>
            <UserBulkDeleteDialog userIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </UserBulkDeleteDialog>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === users.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(users.map((user) => user.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Nomor telepon</TableHead>
            <TableHead>Role names</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter((user) => JSON.stringify(user).toLowerCase().includes(cari.toLowerCase()))
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(user.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, user.id]);
                          } else {
                            setIds(ids.filter((id) => id !== user.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={user.avatar} />
                    </Avatar>
                    <div>{user.name}</div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role_lists?.join(', ')}</TableCell>
                <TableCell>
                  <UserResetPasswordDialog user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Key />
                    </Button>
                  </UserResetPasswordDialog>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('user.show', user.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <UserFormSheet purpose="edit" user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </UserFormSheet>
                  <UserDeleteDialog user={user}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </UserDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default UserList;
