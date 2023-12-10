import { fetchBooks, getBooks } from '@/lib/api/books';
import { sleep } from '@/lib/utils';
import { BooksResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

export default function useInfiniteBooks({
  initialBooks,
  limit = 3,
  category,
}: {
  initialBooks: BooksResponse;
  limit?: number;
  category?: string;
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
    queryKey: ['books', category],
    queryFn: async ({ pageParam }) => {
      await sleep(1000);
      return getBooks({
        page: `${pageParam}`,
        pageSize: `${limit}`,
        category: category || '',
      });
    },
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
    (node: any) => {
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
