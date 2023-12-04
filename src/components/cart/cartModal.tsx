'use client';

import { openCartAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAtom } from 'jotai';
import CartItem from './cartItem';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type CartModalProps = {
  cartData: any;
};

export default function CartModal({ cartData }: CartModalProps) {
  const [isCartOpen, setIsCartOpen] = useAtom(openCartAtom);

  const router = useRouter();

  const handleCreateOrder = () => {
    setIsCartOpen(false);
    router.push('/shippingAddress');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="overflow-y-auto will-change-scroll remove-scrollbar w-full max-w-[350px] sm:max-w-[350px]">
        <SheetHeader className="flex flex-col gap-y-3">
          <div className="flex justify-between items-center pt-7">
            <SheetTitle>Cart</SheetTitle>
            <Button
              size={'sm'}
              onClick={handleCreateOrder}
              disabled={cartData?.books?.length === 0}
            >
              Create Order
            </Button>
          </div>
          <SheetDescription className="sticky left-0 top-0 w-full">
            <span className="flex items-center justify-between gap-x-3">
              <span className="bg-border h-[1px] w-auto flex-[1_0_auto]" />
              <span className="text-lg flex justify-center text-foreground">
                Total: {formatPrice(cartData.totalPrice)}
              </span>
              <span className="bg-border h-[1px] w-auto flex-[1_0_auto]" />
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-y-4 py-4">
            {cartData?.books?.map((item: any) => (
              <CartItem
                key={item._id}
                price={item.book.price[item.format]}
                title={item.book.title}
                format={item.format}
                cover={item.book.cover}
                id={item.book._id}
                quantity={item.quantity}
                cartid={cartData._id}
              />
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
