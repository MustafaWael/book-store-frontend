'use client';
import { addToCart } from '@/actions';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { fetchUserCart } from '@/lib/api/books';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

type AddToCartProps = {
  format: string;
  bookId: string;
} & React.ComponentProps<'button'>;

export default function AddToCart({
  bookId,
  format,
  className,
}: AddToCartProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    const isLoggedOut = getCookie('logged_out');
    if (isLoggedOut) {
      toast.error('You need to be logged in to add to cart');
      return;
    }

    startTransition(async () => {
      const accessToken = getCookie('access_token');

      const cart = await fetchUserCart(accessToken!);

      if (cart?.books?.length) {
        // is book with the id and format already in cart?
        const book = cart.books.some(
          (book: any) => book.book._id === bookId && book.format === format,
        );

        if (book) {
          toast.error('Book already in cart');
          return;
        }
      }

      await addToCart(bookId, format);
      toast.success('Added to cart');
    });
  };

  return (
    <Button onClick={handleClick} className={className} disabled={isPending}>
      {isPending ? (
        <>
          Adding to cart
          <Loader2 className="animate-spin ml-2" size={16} />
        </>
      ) : (
        'Add to cart'
      )}
    </Button>
  );
}
