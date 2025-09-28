import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  const { quote, settings } = usePage<SharedData>().props;

  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className={cn(
          'relative hidden h-full flex-col bg-transparent p-10 text-foreground lg:flex dark:border-r',
          'bg-gradient-to-br from-primary/10 to-success/10',
        )}
      >
        <div className="absolute inset-0" />
        <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
          <AppLogoIcon className="mr-2 size-8 fill-current" />
          {settings?.SCHOOL_NAME}
        </Link>
        {quote && (
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
              <footer className="text-sm">{quote.author}</footer>
            </blockquote>
          </div>
        )}
      </div>
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
            <AppLogoIcon className="h-10 fill-current sm:h-12" />
          </Link>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-sm text-balance text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
