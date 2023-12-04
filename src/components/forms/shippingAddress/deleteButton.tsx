'use client';
import { deleteOrdersByAddressId, deleteShippingAddress } from '@/actions';
import { Button } from '@/components/ui/button';
import { sleep } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

export default function DeleteShippingAddressButton({
  addressId,
}: {
  addressId: string;
}) {
  const action = deleteShippingAddress.bind(null, addressId);
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await action();
      await deleteOrdersByAddressId(addressId);
      sleep(2000).then(() => {
        toast.success('Shipping address deleted successfully');
      });
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} variant={'destructive'}>
      {isPending ? (
        <>
          Deleting
          <Loader2 className="animate-spin ml-2" size={16} />
        </>
      ) : (
        'Delete'
      )}
    </Button>
  );
}
