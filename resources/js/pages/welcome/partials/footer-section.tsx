import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Globe, Mail, Phone } from 'lucide-react';
import SectionContainer from '../layout/section-container';

const FooterSection = () => {
  const { settings } = usePage<SharedData>().props;
  return (
    <SectionContainer>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1.5">
          <h1 className="text-xl font-bold">{settings?.SCHOOL_NAME}</h1>
          <p className="text-muted-foreground">{settings?.SCHOOL_ADDRESS}</p>
        </div>
        <div className="flex flex-col items-end">
          <Button variant={'ghost'} className="w-fit justify-start">
            <Phone />
            {settings?.SCHOOL_PHONE}
          </Button>
          <Button variant={'ghost'} className="w-fit justify-start">
            <Globe />
            {settings?.SCHOOL_WEBSITE}
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
