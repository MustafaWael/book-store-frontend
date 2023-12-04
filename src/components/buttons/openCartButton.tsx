'use client';

import { openCartAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';

type OpenCartProps = {
  cartItemsNumber: number;
} & React.ComponentProps<'button'>;

export default function OpenCartButton({ cartItemsNumber }: OpenCartProps) {
  const setOpenCart = useSetAtom(openCartAtom);
  const openCart = () => setOpenCart(true);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="relative"
      onClick={openCart}
    >
      {cartItemsNumber > 0 && (
        <span className="absolute left-full bottom-full -translate-x-1/2 translate-y-1/2 bg-secondary text-secondary-foreground rounded-full text-sm w-1 h-1 p-2 box-content grid place-content-center">
          {cartItemsNumber}
        </span>
      )}
      <ShoppingCartIcon size={24} />
    </Button>
  );
}
