export const BOOK_FORMATS: readonly ['paperback', 'hardcover', 'ebook'];

type Price = {
  [key in (typeof BOOK_FORMATS)[number]]: number;
};

type Author = {
  _id: string;
  name: string;
};

type OrdersResponse = {
  _id: string;
  userId: string;
  books: [
    { book: string; quantity: number; format: (typeof BOOK_FORMATS)[number] },
  ];
  status: 'conpleted' | 'pending' | 'cancelled';
  date: Date;
  address: string;
}[];

type Category = {
  _id: string;
  name: string;
  createdBy: string;
  __v: number;
};

export type Book = {
  _id: string;
  cover: string;
  title: string;
  author: Author;
  description: string;
  category: Category;
  summary: string;
  price: Price;
  year: number;
  avarage_rating: number;
};

export type BookResponse = {
  _id: string;
  cover: string;
  title: string;
  author: Author;
  description: string;
  category: Category;
  summary: string;
  price: Price;
  year: number;
  avarage_rating: number;
};

export type BooksResponse = {
  books: Book[];
  totalBooks: number;
  currentPage: number;
  totalPages: number;
};

export type Address = {
  _id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  __v: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  __v: number;
};

export type Comment = {
  _id: string;
  userId: string;
  username: string;
  bookId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Rating = {
  _id: string;
  userId: string;
  username: string;
  bookId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetBookRatingsResponse = {
  ratings: Rating[];
  totalRatings: number;
  currentPage: number;
  totalPages: number;
};
