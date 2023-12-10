'use client';
import BookCard from '@/components/bookCard';
import * as Icons from 'lucide-react';
import Container from './container';
import { BooksResponse } from '@/types';
import useInfiniteBooks from '@/hooks/useBooks';

type BooksSliderProps = {
  books: BooksResponse;
  category?: string;
};

export default function BooksSlider({ books, category }: BooksSliderProps) {
  const { data, isFetching, hasNextPage, lastElementRef } = useInfiniteBooks({
    initialBooks: books,
    limit: 6,
    category,
  });

  const items = data.pages.map((page, index) => {
    return page.books.map((book, index) => {
      if (hasNextPage) {
        return <BookCard ref={lastElementRef} book={book} key={index} />;
      }
      return <BookCard book={book} key={index} />;
    });
  });

  return (
    <Container asChild>
      <div
        className={`flex gap-x-8 overflow-x-auto will-change-scroll remove-scrollbar scroll-smooth items-start xl:mask-slider`}
      >
        {items}
        {isFetching && hasNextPage && (
          <div className="text-foreground my-auto">
            <Icons.Loader2 className="animate-spin" />
          </div>
        )}
      </div>
    </Container>
  );
}
