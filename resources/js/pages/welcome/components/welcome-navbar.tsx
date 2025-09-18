import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

import { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Home, LogIn, Newspaper, UserPlus2 } from 'lucide-react';

const links: NavItem[] = [
  {
    title: 'Home',
    icon: Home,
    href: route('home'),
  },
  {
    title: 'Berita',
    icon: Newspaper,
    href: route('berita'),
  },
  {
    title: 'Pendaftaran',
    icon: UserPlus2,
    href: route('alur'),
  },
];

const authLinks: NavItem[] = [
  {
    title: 'Masuk',
    icon: LogIn,
    href: route('login'),
  },
];

const WelcomeNavbar = () => {
  // const { settings } = usePage<SharedData>().props;
  const isMobile = useIsMobile();

  return (
    <Card className="rounded-none md:m-6 md:rounded-lg">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            <AppLogo />
          </div>
          <div>
            {!isMobile && (
              <>
                {links.map(({ title, href, icon: Icon }, index) => (
                  <Button variant={'ghost'} asChild key={index}>
                    <Link href={href}>
                      {Icon && <Icon />}
                      <span className="hidden lg:block">{title}</span>
                    </Link>
                  </Button>
                ))}
                {authLinks.map(({ title, href, icon: Icon }, index) => (
                  <Button variant={'ghost'} asChild key={index}>
                    <Link href={href}>
                      {Icon && <Icon />}
                      <span className="hidden lg:block">{title}</span>
                    </Link>
                  </Button>
                ))}
              </>
            )}
            {isMobile && <SidebarTrigger />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeNavbar;
