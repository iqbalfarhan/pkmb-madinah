import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Media } from '@/types';
import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  media: Media[];
};

const PaymentEvidenceDialog: FC<Props> = ({ children, media }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bukti bayar</DialogTitle>
          <DialogDescription>Geser untuk lihat bukti lainnya</DialogDescription>
        </DialogHeader>
        <Carousel>
          <CarouselContent>
            {media.map((m) => (
              <CarouselItem>
                <img src={m.original_url} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentEvidenceDialog;
