import ThemeToggler from '@/components/theme-toggler';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
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
  const { settings } = usePage<SharedData>().props;
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <CardHeader>
            <h1 className="text-lg font-semibold">{settings?.SCHOOL_NAME}</h1>
          </CardHeader>
          <CardFooter className="hidden md:flex">
            {links.map(({ title, href, icon: Icon }, index) => (
              <Button variant={'ghost'} asChild key={index}>
                <Link href={href}>
                  {Icon && <Icon />}
                  {title}
                </Link>
              </Button>
            ))}
            <Button disabled variant={'ghost'}>
              |
            </Button>
            {authLinks.map(({ title, href, icon: Icon }, index) => (
              <Button variant={'ghost'} asChild key={index}>
                <Link href={href}>
                  {Icon && <Icon />}
                  {title}
                </Link>
              </Button>
            ))}
          </CardFooter>
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>df</DropdownMenuTrigger>
              <DropdownMenuContent>
                {links.map(({ href, title, icon: Icon }) => (
                  <DropdownMenuItem asChild>
                    <Link href={href}>
                      {Icon && <Icon />}
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {authLinks.map(({ href, title, icon: Icon }) => (
                  <DropdownMenuItem asChild>
                    <Link href={href}>
                      {Icon && <Icon />}
                      {title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ThemeToggler />
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeNavbar;
