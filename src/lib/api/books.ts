import { BASE_URLS } from '@/constants';
import { ShippingAddress } from '../utils';
import {
  Author,
  Book,
  BookResponse,
  BooksResponse,
  Comment,
  OrdersResponse,
  Rating,
  GetBookRatingsResponse,
} from '@/types';

export const fetchUserCart = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URLS.books}/shopping-cart/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      next: {
        tags: ['shopping-cart'],
      },
    });

    return await response.json();
  } catch (err) {
    console.log({ err });
  }
};

export const fetchBooks = async (
  page: number = 1,
  limit: number = 10,
): Promise<BooksResponse> => {
  const res = await fetch(
    `${BASE_URLS.books}/books?page=${page}&pageSize=${limit}`,
    {
      cache: 'no-store',
      next: {
        tags: ['books'],
      },
    },
  );
  return await res.json();
};

export const fetchOrders = async (
  accessToken: string,
): Promise<OrdersResponse> => {
  const res = await fetch(`${BASE_URLS.books}/orders`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
    next: {
      tags: ['orders'],
    },
  });

  return await res.json();
};

export const fetchAddress = async (addressId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/address/${addressId}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-cache',
    next: {
      tags: ['addresses'],
    },
  });

  return await res.json();
};

export const fetchBook = async (bookId: string): Promise<Book> => {
  const res = await fetch(`${BASE_URLS.books}/books/${bookId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
    next: {
      tags: ['books'],
    },
  });

  return await res.json();
};

export const createCart = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URLS.books}/shopping-cart`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    return await response.json();
  } catch (err) {
    console.log({ err });
  }
};

export const addToCart = async (
  bookId: string,
  format: string,
  accessToken: string,
) => {
  const res = await fetch(
    `${BASE_URLS.books}/shopping-cart/me/${bookId}?format=${format}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      credentials: 'include',
    },
  );

  return res;
};

export const removeFromCart = async (
  bookId: string,
  format: string,
  accessToken: string,
) => {
  console.log({ bookId, format, accessToken });
  const res = await fetch(
    `${BASE_URLS.books}/shopping-cart/me/${bookId}?format=${format}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    },
  );

  const data = await res.json();
  return data;
};

export const updateBookQuantity = async (
  cartId: string,
  bookId: string,
  format: string,
  quantity: number,
  accessToken: string,
) => {
  const res = await fetch(
    `${BASE_URLS.books}/shopping-cart/${cartId}/${bookId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
      body: JSON.stringify({ format, quantity }),
    },
  );

  return res;
};

export const createOrder = async (addressId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/orders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ address: addressId }),
  });

  const data = await res.json();
  console.log('data', data);

  return data;
};

export const deleteOrder = async (orderId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data;
};

export const deleteOrdersByAddressId = async (
  addressId: string,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.books}/orders/address/${addressId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data;
};

export const createShippingAddress = async (
  shippingAddress: ShippingAddress,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.books}/address`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
    // credentials: "include",
    body: JSON.stringify(shippingAddress),
  });

  const data = await res.json();
  return data;
};

export const updateShippingAddress = async (
  id: string,
  shippingAddress: ShippingAddress,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.books}/address/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify(shippingAddress),
  });

  const data = await res.json();

  return data;
};

export const deleteShippingAddress = async (
  id: string,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.books}/address/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const getShippingAddresses = async (accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/address`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const downloadBook = async (
  orderId: string,
  bookId: string,
  accessToken: string,
) => {
  const res = await fetch(
    `${BASE_URLS.books}/books/download/${orderId}/${bookId}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  );

  console.log({ res });

  return res;
};

export const cleanShoppingCart = async (accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/shopping-cart/me/clean`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();
  console.log('clean api', { data });
};

export const getBooks = async (
  searchParams?: Record<string, string>,
): Promise<BooksResponse> => {
  const url = new URL(`${BASE_URLS.books}/books/`);
  url.search = new URLSearchParams(searchParams).toString();

  const res = await fetch(url.href, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const getBook = async (bookId: string): Promise<BookResponse> => {
  const res = await fetch(`${BASE_URLS.books}/books/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const getInventory = async (bookId: string) => {
  const res = await fetch(`${BASE_URLS.books}/inventories/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const getAuthor = async (authorId: string): Promise<Author> => {
  const res = await fetch(`${BASE_URLS.books}/authors/${authorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URLS.books}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await res.json();
  return data;
};

export const rateBook = async (
  bookId: string,
  rating: number,
  username: string,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.books}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ rating, username, bookId }),
  });

  const data = await res.json();
  console.log({ data });
  return data;
};

export const getRating = async (bookId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/ratings/${bookId}`, {
    method: 'GET',
    next: {
      tags: ['ratings'],
    },
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data;
};

export const getBookRatings = async (
  bookId: string,
  page: number = 1,
  limit: number = 10,
): Promise<GetBookRatingsResponse> => {
  const res = await fetch(
    `${BASE_URLS.books}/ratings/book/${bookId}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['ratings'],
      },
    },
  );

  const data = await res.json();
  console.log({ data });
  return data;
};

export const updateRating = async (
  accessToken: string,
  bookId: string,
  update: Partial<Pick<Rating, 'rating' | 'comment'>>,
) => {
  console.log({ bookId, update });

  const res = await fetch(`${BASE_URLS.books}/ratings/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(update),
  });

  const data = await res.json();
  console.log({ data });
  return data;
};

export const deleteRating = async (ratingId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data;
};

export const cancelOrder = async (orderId: string, accessToken: string) => {
  const res = await fetch(`${BASE_URLS.books}/orders/cancel/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  return data;
};
