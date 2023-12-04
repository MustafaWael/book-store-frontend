'use client';
import { deleteOrder } from '@/actions';
import { Button, ButtonProps } from '../ui/button';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

type DeleteOrderButtonProps = {
  orderId: string;
} & ButtonProps;

export default function DeleteOrderButton({
  disabled,
  orderId,
  ...props
}: DeleteOrderButtonProps) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await deleteOrder(orderId);
      toast.success('Order deleted');
    });
  };

  return (
    <Button disabled={pending || disabled} {...props} onClick={handleClick}>
      <span>{pending ? 'Deleting' : 'Delete Order'}</span>
      {pending && <Loader2Icon className="animate-spin ml-2" size={22} />}
    </Button>
  );
}
