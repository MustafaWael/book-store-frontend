'use client';

import { useState } from 'react';
import { cleanShoppingCart, createOrder } from '@/actions';
import { useRouter } from 'next/navigation';
import CreateOrderButton from './buttons/createOrderButton';
import { Address } from '@/types';
import { Button } from './ui/button';

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
      <div className="w-full flex gap-4 flex-wrap justify-center p-8">
        {addresses.map((address) => {
          const isSelected = selectedAddress === address._id;
          // const buttonClass = cn(
          //   'w-full',
          //   'flex',
          //   'items-center',
          //   'justify-center',
          //   'p-4',
          //   'rounded-2xl',
          //   'bg-card',
          //   'text-card-foreground',
          //   'transition',
          //   'duration-300',
          //   'ease-in-out',
          //   isSelected ? 'bg-primary' : 'hover:bg-primary',
          //   isSelected ? 'text-white' : 'hover:text-white',
          // );

          return (
            <Button
              onClick={() => handleAddressSelect(address._id)}
              key={address._id}
              variant={isSelected ? 'secondary' : 'default'}
            >
              <div>{address.fullName}</div>
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
