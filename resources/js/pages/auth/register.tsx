import { Form, Head } from '@inertiajs/react';

import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
  return (
    <AuthLayout title="Buat akun orangtua" description="Buat akun oranguta untuk pendaftaran siswa baru">
      <Head title="Register" />
      <Form
        method="post"
        action={route('register')}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing }) => (
          <>
            <div className="grid gap-6">
              <FormControl label="Nama lengkap">
                <Input type="text" required autoFocus tabIndex={1} autoComplete="name" name="name" placeholder="Full name" />
              </FormControl>

              <FormControl label="Alamat email">
                <Input type="email" required tabIndex={2} autoComplete="email" name="email" placeholder="email@example.com" />
              </FormControl>

              <FormControl label="Username">
                <Input type="text" required tabIndex={3} autoComplete="username" name="username" placeholder="newuser1234" />
              </FormControl>

              <FormControl label="Password">
                <Input type="password" required tabIndex={4} autoComplete="new-password" name="password" placeholder="Password" />
              </FormControl>

              <FormControl label="Konfirmasi password">
                <Input
                  id="password_confirmation"
                  type="password"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                />
              </FormControl>

              <SubmitButton loading={processing} label="Buat akun orang tua" />
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Sudah punya akun?{' '}
              <TextLink href={route('login')} tabIndex={6}>
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  );
}
