'use client';
import { Button, ButtonProps } from '../ui/button';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import { useTransition } from 'react';

type CreateOrderButtonProps = {
  action: () => void | Promise<void>;
} & ButtonProps;

export default function CreateOrderButton({
  disabled,
  ...props
}: CreateOrderButtonProps) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await props.action();
    });
  };

  return (
    <Button disabled={pending || disabled} {...props} onClick={handleClick}>
      <span>{pending ? 'Processing' : 'Process to Payment'}</span>
      {pending ? (
        <Loader2Icon className="animate-spin ml-2" size={22} />
      ) : (
        <ArrowRight size={22} />
      )}
    </Button>
  );
}
