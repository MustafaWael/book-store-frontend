import { fetchBooks } from '@/lib/api/books';
import { BooksResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

export default function useInfiniteBooks({
  initialBooks,
  limit = 6,
}: {
  initialBooks: BooksResponse;
  limit?: number;
}) {
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isPending,
    isError,
    error,
    isPlaceholderData,
  } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: ({ pageParam }) => fetchBooks(pageParam, limit),
    initialPageParam: 1,
    initialData: {
      pages: [initialBooks],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.totalPages) return undefined;
      return lastPage.currentPage + 1;
    },
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1,
  });

  const observerRef = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, isFetching, fetchNextPage],
  );

  return {
    isPending,
    isError,
    error,
    data,
    isFetching,
    isPlaceholderData,
    hasNextPage,
    lastElementRef,
  };
}
