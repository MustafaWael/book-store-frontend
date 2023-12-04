import CartModal from '@/components/cart/cartModal';
import { fetchUserCart } from '@/lib/api/books';
import { cookies } from 'next/headers';

export default async function ShoppingCart() {
  const accessToken = cookies().get('access_token')?.value!;
  const cartData = await fetchUserCart(accessToken);
  if (!cartData) return null;
  return <CartModal cartData={cartData} />;
}
