'use client';
import { cancelOrder } from '@/actions';
import { Button, ButtonProps } from '../ui/button';
import { Loader2Icon } from 'lucide-react';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

type CancelOrderButtonProps = {
  orderId: string;
} & ButtonProps;

export default function CancelOrderButton({
  disabled,
  orderId,
  ...props
}: CancelOrderButtonProps) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await cancelOrder(orderId);
      toast.success('Order Cancelled');
    });
  };

  return (
    <Button disabled={pending || disabled} {...props} onClick={handleClick}>
      <span>{pending ? 'Cancelling' : 'Cancel Order'}</span>
      {pending && <Loader2Icon className="animate-spin ml-2" size={22} />}
    </Button>
  );
}
