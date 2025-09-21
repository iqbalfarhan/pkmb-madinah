import MarkdownReader from '@/components/markdown-reader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { FC, useState } from 'react';

type Props = {
  superadmin: string;
  admin: string;
  guru: string;
  walikelas: string;
  orangtua: string;
};

type TabKey = keyof Props;

const Documentation: FC<Props> = (content) => {
  const { auth } = usePage<SharedData>().props;
  const roleTabs: TabKey[] = ['admin', 'guru', 'walikelas', 'orangtua'];
  const initialTab = (auth.roles.find((r): r is TabKey => roleTabs.includes(r as TabKey)) ?? 'superadmin') as TabKey;
  const [tab, setTab] = useState<TabKey>(initialTab);

  return (
    <AppLayout title="Buku panduan" description={`Buku panduan penggunaan aplikasi sebagai ${auth.roles.join(', ')}`}>
      <Tabs value={tab} onValueChange={(value) => setTab(value as TabKey)}>
        <Card>
          <CardHeader>
            <TabsList className="flex-wrap">
              {auth.roles.map((role) => (
                <TabsTrigger key={role} value={role}>
                  Panduan {role}
                </TabsTrigger>
              ))}
            </TabsList>
          </CardHeader>
          <Separator />
          <CardContent>
            <TabsContent value={tab}>
              <MarkdownReader content={content[tab]} className="mx-auto my-12 max-w-3xl" />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </AppLayout>
  );
};

export default Documentation;
