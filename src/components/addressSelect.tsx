'use client';

import { useState } from 'react';
import { cleanShoppingCart, createOrder } from '@/actions';
import { useRouter } from 'next/navigation';
import CreateOrderButton from './buttons/createOrderButton';
import { Address } from '@/types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

type AddressId = Address['_id'];

type AddressSelectProps = {
  addresses: Address[];
};

export default function AddressSelect({ addresses }: AddressSelectProps) {
  const [selectedAddress, setSelectedAddress] = useState<AddressId | null>(
    null,
  );

  const handleAddressSelect = (addressId: AddressId) => {
    setSelectedAddress(addressId);
  };

  const router = useRouter();

  const createOrderAction = async () => {
    if (!selectedAddress) return;
    const orderRes = await createOrder(selectedAddress);
    console.log({ orderRes });
    if (!orderRes) return;
    cleanShoppingCart();

    router.push(orderRes.checkoutUrl);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <div className="w-full grid gird-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((address) => {
          const isSelected = selectedAddress === address._id;
          const buttonClass = cn(
            'w-full',
            'h-auto',
            'flex',
            'items-start',
            'justify-start',
            'p-4',
            'rounded-2xl',
            'bg-card',
            'text-card-foreground',
            'transition',
            'duration-300',
            'ease-in-out',
            'bg-slate-800',
            isSelected
              ? 'bg-primary text-white outline outline-outline'
              : 'hover:bg-primary hover:text-white',
          );

          return (
            <Button
              onClick={() => handleAddressSelect(address._id)}
              key={address._id}
              className={buttonClass}
            >
              <div className="flex flex-col justify-start items-start">
                <span className='text-3xl'>{address.fullName}</span>
                <span>address line 1: {address.addressLine1}</span>
                <span>address line 2: {address.addressLine2}</span>
              </div>
            </Button>
          );
        })}
      </div>

      <div className="flex justify-center mt-6 w-full">
        <CreateOrderButton
          disabled={!selectedAddress}
          action={createOrderAction}
        />
      </div>
    </div>
  );
}
