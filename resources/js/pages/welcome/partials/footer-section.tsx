import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Globe, Mail, Phone } from 'lucide-react';
import SectionContainer from '../layout/section-container';

const FooterSection = () => {
  const { settings } = usePage<SharedData>().props;
  return (
    <SectionContainer>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col space-y-6">
          <AppLogoIcon className="size-12 fill-primary" />
          <div className="space-y-0">
            <h1 className="text-xl font-semibold">{settings?.SCHOOL_NAME}</h1>
            <p className="text-muted-foreground">{settings?.SCHOOL_ADDRESS}</p>
          </div>
        </div>
        <div className="flex flex-col md:items-end">
          <Button variant={'ghost'} className="w-fit justify-start">
            <Phone />
            {settings?.SCHOOL_PHONE}
          </Button>
          <Button variant={'ghost'} className="w-fit justify-start">
            <Globe />
            <div className="line-clamp-1 text-wrap">{settings?.SCHOOL_WEBSITE}</div>
          </Button>
          <Button variant={'ghost'} className="w-fit justify-start">
            <Mail />
            {settings?.SCHOOL_EMAIL}
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default FooterSection;
