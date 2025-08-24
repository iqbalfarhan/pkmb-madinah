import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, CalendarCheck, ChevronsUpDown, Database, KeySquare, LayoutGrid, Newspaper, Palette, Users, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Documentation',
    href: route('documentation'),
    icon: BookOpen,
  },
];

// const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const { menus } = usePage<{ menus: Record<string, boolean> }>().props;

  return (
    <Sidebar collapsible="icon" variant="sidebar">
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

      <SidebarContent className="space-y-4">
        <NavMain items={[...mainNavItems]} label="Dashboard" />
        <NavMain
          items={[
            {
              title: 'Classroom lists',
              href: route('classroom.index'),
              icon: KeySquare,
              available: menus.classroom,
            },
          ]}
          label="Kelas & pelajaran"
        />
        <NavMain
          items={[
            {
              title: 'Academic Year',
              href: route('academicyear.index'),
              icon: CalendarCheck,
              available: menus.academicyear,
            },
            {
              title: 'Grade lists',
              href: route('grade.index'),
              icon: ChevronsUpDown,
              available: menus.grade,
            },
            {
              title: 'Teachers lists',
              href: route('teacher.index'),
              icon: UsersRound,
              available: menus.grade,
            },
            {
              title: 'Subject lists',
              href: route('subject.index'),
              icon: Book,
              available: menus.subject,
            },
            {
              title: 'Schools news',
              href: route('news.index'),
              icon: Newspaper,
              available: menus.news,
            },
            {
              title: 'Extracurricular lists',
              href: route('extracurricular.index'),
              icon: Palette,
              available: menus.extracurricular,
            },
            {
              title: 'Payment lists',
              href: route('paymenttype.index'),
              icon: Palette,
              available: menus.paymenttype,
            },
          ]}
          label="Master data"
        />
        <NavMain
          items={[
            {
              title: 'User management',
              href: route('user.index'),
              icon: Users,
              available: menus.user,
            },
            {
              title: 'Role & permission',
              href: route('role.index'),
              icon: KeySquare,
              available: menus.role,
            },
            {
              title: 'Adminer database',
              href: '/adminer',
              icon: Database,
              available: menus.adminer,
            },
          ]}
          label="Settings"
        />
      </SidebarContent>

      <SidebarFooter>
        {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
