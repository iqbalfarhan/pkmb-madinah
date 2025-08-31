import { FC, PropsWithChildren } from 'react';
import WelcomeNavbar from '../components/welcome-navbar';
import FooterSection from '../partials/footer-section';

type Props = PropsWithChildren;

const WelcomeLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="p-4">
        <WelcomeNavbar />
      </div>
      {children}
      <FooterSection />
    </>
  );
};

export default WelcomeLayout;
