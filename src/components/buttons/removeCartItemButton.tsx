'use client';
import { removeFromCart } from '@/actions';
import { sleep } from '@/lib/utils';
import { Loader2, X } from 'lucide-react';
import { use, useEffect, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

type RemoveCartItemButtonProps = {
  bookId: string;
  format: string;
};

export default function RemoveCartItemButton({
  bookId,
  format,
}: RemoveCartItemButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await removeFromCart(bookId, format);
      if (!isPending) {
        sleep(1000).then(() => {
          toast.success('Removed from cart');
        });
      }
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant={'destructive'}
      size={'sm'}
      className="absolute right-2 top-2 p-1 h-fit w-fit"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <X size={16} />
      )}
    </Button>
  );
}
