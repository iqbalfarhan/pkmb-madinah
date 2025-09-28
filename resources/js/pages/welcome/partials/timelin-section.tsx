import { Card, CardContent } from '@/components/ui/card';
import { numberPad } from '@/lib/utils';
import SectionContainer from '../layout/section-container';
import { dataAlurPendaftaran } from './alur-section';

const TimelineSection = () => {
  return (
    <SectionContainer title="Alur pendaftaran siswa baru" description="d">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="space-y-10 lg:sticky lg:top-12">
            <h4 className="text-5xl font-bold">Alur pendaftaran peserta didik baru.</h4>
            <p className="text-muted-foreground">Seamlessly integrate AI into your workflows. Automate tasks, enhance efficiency, and stay ahead.</p>
          </div>
        </div>
        <div className="space-y-6">
          {dataAlurPendaftaran.map((item) => (
            <Card>
              <CardContent className="space-y-10 p-6 md:p-12">
                <h1 className="text-right font-mono text-6xl">{numberPad(item.index, 2)}</h1>
                <item.icon size={42} />
                <h4 className="text-2xl">{item.title}</h4>
                {item.description.map((text) => (
                  <p className="text-muted-foreground">{text}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TimelineSection;
