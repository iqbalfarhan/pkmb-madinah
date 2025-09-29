import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FC, PropsWithChildren } from 'react';
import WelcomeNavbar from '../components/welcome-navbar';
import WelcomeSidebar from '../components/welcome-sidebar';
import FooterSection from '../partials/footer-section';

type Props = PropsWithChildren;

const WelcomeLayout: FC<Props> = ({ children }) => {
  const { name } = usePage<SharedData>().props;

  return (
    <SidebarProvider defaultOpen={false}>
      <Head>
        <title>{name}</title>
        <link rel="icon" type="image/svg+xml" href="/rapor-perkembangan.png" />
      </Head>
      <WelcomeSidebar />
      <SidebarInset className="bg-gradient-to-br from-primary/20 to-success/20">
        <WelcomeNavbar />
        {children}
        <FooterSection />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default WelcomeLayout;
