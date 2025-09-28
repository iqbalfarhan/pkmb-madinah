import { Card, CardContent } from '@/components/ui/card';
import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
  return (
    <AuthLayoutTemplate title={title} description={description} {...props}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </AuthLayoutTemplate>
  );
}
