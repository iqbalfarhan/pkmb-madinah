import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Classroom } from '@/types/classroom';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { Link, usePage } from '@inertiajs/react';
import {
  Badge,
  Book,
  BookOpen,
  CalendarCheck,
  ChevronsUpDown,
  FileBadge,
  Folder,
  KeySquare,
  LayoutGrid,
  List,
  ListCheck,
  Newspaper,
  Palette,
  Pencil,
  Pointer,
  RemoveFormatting,
  Settings,
  UserCircle,
  Users,
  Users2,
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
];

// const footerNavItems: NavItem[] = [];

export function AppSidebar() {
  const {
    auth: { roles },
    menus,
    myclassrooms = [],
    mylessons = [],
    mystudents = [],
  } = usePage<
    SharedData & {
      menus: Record<string, boolean>;
      myclassrooms: Classroom[];
      mylessons: Lesson[];
      mystudents: Student[];
    }
  >().props;

  return (
    <Sidebar collapsible="icon" variant="floating">
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
              title: 'Buku panduan',
              href: route('documentation'),
              icon: BookOpen,
              available: menus.documentation,
            },
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
            ...mystudents.map((s) => ({
              title: s.name,
              href: route('student.show', s.id),
              icon: UserCircle,
              available: roles.includes('orangtua'),
            })),
          ]}
          label="Menu orangtua"
        />
        <NavMain
          items={myclassrooms.map((c) => ({
            title: c.name,
            href: route('classroom.show', c.id),
            icon: Folder,
            available: roles.includes('walikelas'),
          }))}
          label="Menu walikelas"
        />
        <NavMain
          items={mylessons.map((l) => ({
            title: l.name,
            href: route('lesson.show', l.id),
            icon: Newspaper,
            available: roles.includes('guru'),
          }))}
          label="Menu guru mapel"
        />
        <NavMain
          items={[
            {
              title: 'Pengaturan PPDB',
              href: route('ppdb.index'),
              icon: Settings,
              available: menus.ppdb,
            },
            {
              title: 'Tahun Ajaran',
              href: route('academicyear.index'),
              icon: CalendarCheck,
              available: menus.academicyear,
            },

            {
              title: 'Berita Sekolah',
              href: route('news.index'),
              icon: Newspaper,
              available: menus.news,
            },

            {
              title: 'Tagihan & Pembayaran',
              href: route('bill.index'),
              icon: Wallet,
              available: menus.bill,
              items: [
                {
                  title: 'Tagihan Siswa',
                  href: route('bill.index'),
                  icon: Wallet,
                  available: menus.bill,
                },
                {
                  title: 'Validasi Pembayaran',
                  href: route('payment.index'),
                  icon: Wallet,
                  available: menus.payment,
                },
                {
                  title: 'Jenis Pembayaran',
                  href: route('paymenttype.index'),
                  icon: Wallet,
                  available: menus.paymenttype,
                },
              ],
            },

            {
              title: 'Data Master',
              href: '',
              icon: List,
              available: menus.grade,
              items: [
                {
                  title: 'Tingkat kelas',
                  href: route('grade.index'),
                  icon: ChevronsUpDown,
                  available: menus.grade,
                },
                {
                  title: 'Mata pelajaran',
                  href: route('subject.index'),
                  icon: Book,
                  available: menus.subject,
                },
                {
                  title: 'Ekstrakulikuler',
                  href: route('extracurricular.index'),
                  icon: Palette,
                  available: menus.extracurricular,
                },
                {
                  title: 'Data penilaian',
                  href: route('assessment.index'),
                  icon: ListCheck,
                  available: menus.assessment,
                },
              ],
            },
            {
              title: 'Kelas & pelajaran',
              href: route('classroom.index'),
              icon: KeySquare,
              available: menus.classroom,
              items: [
                {
                  title: 'Daftar Kelas',
                  href: route('classroom.index'),
                  icon: KeySquare,
                  available: menus.classroom,
                },
                {
                  title: 'Sesi pelajaran',
                  href: route('lesson.index'),
                  icon: RemoveFormatting,
                  available: menus.lesson,
                },
                {
                  title: 'Materi belajar',
                  href: route('material.index'),
                  icon: BookOpen,
                  available: menus.material,
                },
                {
                  title: 'Jurnal & Prakarya',
                  href: route('assignment.index'),
                  icon: Pencil,
                  available: menus.assignment,
                },
                {
                  title: 'Evaluasi',
                  href: route('exam.index'),
                  icon: Badge,
                  available: menus.exam,
                },
              ],
            },
            {
              title: 'Pengaturan siswa',
              href: route('student.index'),
              icon: Users,
              available: menus.student,
              items: [
                {
                  title: 'Daftar siswa aktif',
                  href: route('student.index'),
                  icon: Users,
                  available: menus.student,
                },
                {
                  title: 'E-rapor siswa',
                  href: route('report.index'),
                  icon: FileBadge,
                  available: menus.report,
                },
                {
                  title: 'Ketidakhadiran',
                  href: route('absent.index'),
                  icon: XSquare,
                  available: menus.absent,
                },
                {
                  title: 'Nilai tugas siswa',
                  href: route('score.index'),
                  icon: Pointer,
                  available: menus.score,
                },
                {
                  title: 'Kegiatan ekskul',
                  href: route('activity.index'),
                  icon: Palette,
                  available: menus.activity,
                },
              ],
            },
          ]}
          label="Master data"
        />

        <NavMain
          items={[
            {
              title: 'Pengguna aplikasi',
              href: route('user.index'),
              icon: Users2,
              available: menus.user,
            },
            {
              title: 'Pengaturan sekolah',
              href: route('setting.index'),
              icon: Settings,
              available: menus.setting,
            },
            {
              title: 'Role & permission',
              href: route('role.index'),
              icon: KeySquare,
              available: menus.role,
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
