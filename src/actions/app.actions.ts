'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import * as appAPI from '@/lib/api/books';
import {
  ShippingAddress,
  formDataToObject,
  mapJoiErrors,
  validateShippingAddress,
} from '@/lib/utils';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/api/auth';
import { Rating } from '@/types';

export const addToCart = async (bookId: string, format: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');
    const res = await appAPI.addToCart(bookId, format, accessToken);
    if (res.ok) revalidateTag('shopping-cart');
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (bookId: string, format: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');
    await appAPI.removeFromCart(bookId, format, accessToken);
    revalidateTag('shopping-cart');
  } catch (error) {
    console.log(error);
  }
};

export const updateBookQuantity = async (
  cartId: string,
  bookId: string,
  format: string,
  quantity: number,
) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    const res = await appAPI.updateBookQuantity(
      cartId,
      bookId,
      format,
      quantity,
      accessToken,
    );

    if (res.ok) revalidateTag('shopping-cart');
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (addressId: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    const data = await appAPI.createOrder(addressId, accessToken);
    return { checkoutUrl: data.checkoutUrl as string };
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    await appAPI.deleteOrder(orderId, accessToken);
    revalidateTag('orders');
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    await appAPI.cancelOrder(orderId, accessToken);
    revalidateTag('orders');
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrdersByAddressId = async (addressId: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    await appAPI.deleteOrdersByAddressId(addressId, accessToken);
  } catch (error) {
    console.log(error);
  }
};

export const createShippingAddress = async (formData: FormData) => {
  const form = formDataToObject<ShippingAddress>(formData);
  const { error, value } = validateShippingAddress(form);

  if (error) return { validationError: mapJoiErrors(error) };

  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    const data = await appAPI.createShippingAddress(value, accessToken);
    revalidateTag('addresses');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateShippingAddress = async (id: string, formData: FormData) => {
  const form = formDataToObject<ShippingAddress>(formData);
  const { error, value } = validateShippingAddress(form);

  if (error) return { validationError: mapJoiErrors(error) };

  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    const data = await appAPI.updateShippingAddress(id, value, accessToken);
    revalidateTag('addresses');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShippingAddress = async (id: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    await appAPI.deleteShippingAddress(id, accessToken);
    revalidateTag('addresses');
  } catch (error) {
    console.log(error);
  }
};

export const cleanShoppingCart = async () => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');

    await appAPI.cleanShoppingCart(accessToken);
  } catch (error) {
    console.log(error);
  }
};

// get book formats: currently there is no format document in the database
// the formates stored in the price field
// we need to store the formats in a separate document

export const rateBook = async (bookId: string, rating: number) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');
    const { name } = await getUser(accessToken);

    const data = await appAPI.rateBook(bookId, rating, name, accessToken);
    revalidateTag('ratings');
    return data;
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};

export const updateRating = async (
  bookId: string,
  update: Partial<Pick<Rating, 'rating' | 'comment'>>,
) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');
    const res = await appAPI.updateRating(accessToken, bookId, update);
    revalidateTag('ratings');
    return res;
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
  }
};

export const deleteRating = async (bookId: string) => {
  try {
    const accessToken = cookies().get('access_token')?.value;
    if (!accessToken) throw new Error('No access token');
    await appAPI.deleteRating(bookId, accessToken);
    revalidatePath(`/books/${bookId}`);
  } catch (error) {
    console.log(error);
  }
};
