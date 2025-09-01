import AppLogo from '@/components/app-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
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

const WelcomeSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Halaman utama</SidebarGroupLabel>
            <SidebarMenu>
              {links.map(({ href, title, icon: Icon }, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      {Icon && <Icon />}
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Authentikasi</SidebarGroupLabel>
            <SidebarMenu>
              {authLinks.map(({ href, title, icon: Icon }, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link href={href}>
                      {Icon && <Icon />}
                      {title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>
    </Sidebar>
  );
};

export default WelcomeSidebar;
