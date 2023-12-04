export const PROTECTED_ROUTES = [
  '/shippingAddress',
  '/cerateAddress',
  '/orders',
  '/profile',
];

export const BASE_URLS = {
  authentication: process.env.AUTH_SERVER || 'http://localhost:4000',
  books: process.env.BOOKS_SERVER || 'http://localhost:4001',
};
