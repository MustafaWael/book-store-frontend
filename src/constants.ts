export const PROTECTED_ROUTES = [
  '/shippingAddress',
  '/cerateAddress',
  '/orders',
  '/profile',
];

export const BASE_URLS = {
  authentication: process.env.NEXT_PUBLIC_AUTH_SERVER || 'http://localhost:4000',
  books: process.env.NEXT_PUBLIC_BOOKS_SERVER || 'http://localhost:4001',
};
