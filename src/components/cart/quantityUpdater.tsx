'use client';
import { updateBookQuantity } from '@/actions';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { sleep } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Loader2Icon, Minus, Plus } from 'lucide-react';

type QuantityUpdater = {
  id: string;
  quantity: number;
  price: number;
  cartid: string;
  format: string;
};

export default function QuantityUpdater({
  id,
  quantity,
  cartid,
  format,
}: QuantityUpdater) {
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();

  const handleIncrement = async () => {
    startTransition(async () => {
      await updateBookQuantity(cartid, id, format, quantity + 1);
      sleep(1000).then(() => {
        toast.success('Quantity updated');
      });
    });
  };

  const handleDecrement = async () => {
    startTransition2(async () => {
      await updateBookQuantity(cartid, id, format, quantity - 1);
      sleep(1000).then(() => {
        toast.success('Quantity updated');
      });
    });
  };

  return (
    <div className="flex gap-x-2 items-center rounded-xl bg-secondary border-2 py-1 px-2 border-border text-secondary-foreground">
      <Button
        variant="default"
        size="icon"
        className="scale-100 hover:scale-125 transition-all  rounded-xl flex items-center justify-center will-change-[transform,background] w-6 h-6"
        onClick={handleDecrement}
        disabled={quantity === 1}
      >
        {isPending2 ? (
          <Loader2Icon className="animate-spin" size={16} />
        ) : (
          <Minus size={16} />
        )}
      </Button>
      <span>{quantity}</span>
      <Button
        variant="default"
        size="icon"
        className="scale-100 hover:scale-125 transition-all  rounded-xl flex items-center justify-center will-change-[transform,background] w-6 h-6"
        onClick={handleIncrement}
      >
        {isPending ? (
          <Loader2Icon className="animate-spin" size={16} />
        ) : (
          <Plus size={16} />
        )}
      </Button>
    </div>
  );
}
