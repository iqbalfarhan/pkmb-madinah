import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bill } from '@/types/bill';
import { router, usePage } from '@inertiajs/react';

const BillWidget = () => {
  const { bills = [] } = usePage<{ bills: Bill[] }>().props;

  if (bills.length === 0) return null;

  return (
    <Card onClick={() => router.visit(route('bills'))}>
      <div className="flex justify-between">
        <CardHeader>
          <CardTitle>Tagihan pembayaran</CardTitle>
          <CardDescription>Tagihan pembayaran contoh data</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size={'icon'} variant={'warning'}>
            {bills.length}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BillWidget;
