'use client';

import useInfiniteBooks from '@/hooks/useBooks';
import { BooksResponse } from '@/types';
import BookCard from './bookCard';
import { Loader2 } from 'lucide-react';

type InfiniteLoadBooksProps = {
  books: BooksResponse;
  category?: string;
  limit?: number;
};

export default function InfiniteLoadBooks({
  books,
  category,
  limit,
}: InfiniteLoadBooksProps) {
  const { data, isFetching, hasNextPage, lastElementRef } = useInfiniteBooks({
    initialBooks: books,
    limit,
    category,
  });

  const items = data.pages.map((page, index) => {
    return page.books.map((book, index) => {
      if (hasNextPage) {
        return (
          <li key={book._id} className="h-full" ref={lastElementRef}>
            <BookCard book={book} />
          </li>
        );
      }
      return (
        <li key={book._id} className="h-full">
          <BookCard book={book} />
        </li>
      );
    });
  });

  return (
    <section className="w-full">
      <ul className="auto-grid">{items}</ul>
      {isFetching && hasNextPage && (
        <div className="text-foreground my-4 flex justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </section>
  );
}
