import { Card, CardContent } from '@/components/ui/card';
import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children, title, description, ...props }: PropsWithChildren & { title: string; description: string }) {
  return (
    <AuthLayoutTemplate title={title} description={description} {...props}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </AuthLayoutTemplate>
  );
}
