import { Card, CardContent } from '@/components/ui/card';
import { numberPad } from '@/lib/utils';
import SectionContainer from '../layout/section-container';
import { dataAlurPendaftaran } from './alur-section';

const TimelineSection = () => {
  return (
    <SectionContainer>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="space-y-10 lg:sticky lg:top-12">
            <h4 className="text-6xl font-bold text-primary">Alur pendaftaran peserta didik baru.</h4>
            <p className="text-muted-foreground">
              Bagaimana cara pendaftaran siswa baru di sini. Ikuti langkah langkah pendaftaran sebagai berikut:.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {dataAlurPendaftaran.map((item, id) => (
            <Card key={id} className="bg-card/30">
              <CardContent className="space-y-10 p-6 md:p-12">
                <h1 className="text-right font-mono text-6xl font-bold">#{numberPad(item.index, 2)}</h1>
                <item.icon size={42} />
                <h4 className="text-2xl">{item.title}</h4>
                <div className="space-y-4">
                  {item.description.map((text, index) => (
                    <p key={index} className="text-muted-foreground">
                      {text}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TimelineSection;
