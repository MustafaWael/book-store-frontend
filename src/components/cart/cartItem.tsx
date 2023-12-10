import Image from '@/components/image';
import Tag from '@/components/tag';
import QuantityUpdater from './quantityUpdater';
import { formatPrice } from '@/lib/utils';
import RemoveCartItemButton from '../buttons/removeCartItemButton';

type CartItemProps = {
  price: number;
  title: string;
  format: string;
  cover: string;
  id: string;
  quantity: number;
  cartid: string;
  isBookInCart?: boolean;
};

export default function CartItem({
  price,
  title,
  format,
  cover,
  id,
  quantity,
  cartid,
}: CartItemProps) {
  return (
    <li className="border-2 border-border rounded-lg flex gap-4 p-2 relative ">
      {/* image */}
      <Image
        src={cover}
        width={90}
        height={150}
        wrapperWidth='90px'
        wrapperHeight='150px'
        skeletonClassName='rounded-md'
        alt="book"
        className="object-cover h-[150px] rounded-md"
      />

      <div className="flex flex-col gap-y-3">
        <div className='flex flex-col gap-1'>
          <Tag name={format} className="w-fit text-sm md:text-xs font-normal" />

          <RemoveCartItemButton bookId={id} format={format} />

          <h2 className="text-foreground">{title}</h2>
          <span className="text-base md:text-lg text-foreground">
            {formatPrice(price)}
          </span>
        </div>
        <div className="flex gap-2 items-center justify-center flex-wrap xs:justify-start xs:flex-nowrap">
          <QuantityUpdater
            id={id}
            quantity={quantity}
            price={price}
            cartid={cartid}
            format={format}
          />
          <span className="text-base md:text-lg text-foreground">
            {formatPrice(price * quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
