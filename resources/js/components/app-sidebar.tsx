import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { Link, usePage } from '@inertiajs/react';
import {
  Book,
  BookOpen,
  CalendarCheck,
  ChevronsUpDown,
  Database,
  FileBadge,
  Folder,
  KeySquare,
  LayoutGrid,
  Newspaper,
  Palette,
  RemoveFormatting,
  Settings,
  UserCircle,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  XSquare,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
    icon: LayoutGrid,
  },
  {
    title: 'Buku panduan',
    href: route('documentation'),
    icon: BookOpen,
  },
];

// const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const {
    menus,
    myclassrooms = [],
    mylessons = [],
    mystudents = [],
  } = usePage<{
    menus: Record<string, boolean>;
    myclassrooms: Classroom[];
    mylessons: Lesson[];
    mystudents: Student[];
  }>().props;

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
        <NavMain
          items={[
            ...mainNavItems,
            {
              title: 'Tagihan pembayaran',
              href: route('bills'),
              icon: Wallet,
              available: menus.studentBill,
            },
          ]}
          label="Dashboard"
        />
        <NavMain
          items={[
            {
              title: 'Pendaftaran siswa baru',
              href: route('ppdb.create'),
              icon: UserPlus,
              available: menus.student,
            },
            {
              title: 'Pengaturan PPDB',
              href: route('ppdb.index'),
              icon: Settings,
              available: menus.student,
            },
          ]}
          label="Pendaftaran siswa baru"
        />
        <NavMain
          items={[
            ...mystudents.map((s) => ({
              title: s.name,
              href: route('student.show', s.id),
              icon: UserCircle,
            })),
          ]}
          label="Menu orangtua"
        />
        <NavMain
          items={myclassrooms.map((c) => ({
            title: c.name,
            href: route('classroom.show', c.id),
            icon: Folder,
          }))}
          label="Menu walikelas"
        />
        <NavMain
          items={mylessons.map((l) => ({
            title: l.name,
            href: route('lesson.show', l.id),
            icon: Newspaper,
          }))}
          label="Menu guru mapel"
        />
        <NavMain
          items={[
            {
              title: 'Classroom lists',
              href: route('classroom.index'),
              icon: KeySquare,
              available: menus.classroom,
            },
            {
              title: 'Classroom sessions',
              href: route('lesson.index'),
              icon: RemoveFormatting,
              available: menus.lesson,
            },
            {
              title: 'Lesson materials',
              href: route('material.index'),
              icon: BookOpen,
              available: menus.material,
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
              icon: Wallet,
              available: menus.paymenttype,
            },
          ]}
          label="Master data"
        />
        <NavMain
          items={[
            {
              title: 'Student lists',
              href: route('student.index'),
              icon: Users,
              available: menus.student,
            },
            {
              title: 'Student Report',
              href: route('report.index'),
              icon: FileBadge,
              available: menus.report,
            },
            {
              title: 'Student Absent',
              href: route('absent.index'),
              icon: XSquare,
              available: menus.absent,
            },
            {
              title: 'Tagihan siswa',
              href: route('bill.index'),
              icon: Wallet,
              available: menus.bill,
            },
          ]}
          label="Students data"
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
