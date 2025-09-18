import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { FC, PropsWithChildren } from 'react';
import WelcomeNavbar from '../components/welcome-navbar';
import WelcomeSidebar from '../components/welcome-sidebar';
import FooterSection from '../partials/footer-section';

type Props = PropsWithChildren;

const WelcomeLayout: FC<Props> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={false}>
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
