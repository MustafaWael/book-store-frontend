import { getBookRatings } from '@/lib/api/books';
import { GetBookRatingsResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

export default function useInfiniteBookRatings({
  bookId,
  initialData,
  limit = 6,
}: {
  bookId: string;
  initialData: GetBookRatingsResponse;
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
    queryKey: ['bookRatings', bookId],
    queryFn: ({ pageParam }) => getBookRatings(bookId, pageParam, limit),
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage === lastPage.totalPages) return undefined;
      return lastPage.currentPage + 1;
    },
    getPreviousPageParam: (firstPage) => firstPage.currentPage - 1,
    refetchOnMount: false,
  });

  const observerRef = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          initialData.ratings.length > 1 && fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [hasNextPage, isFetching, fetchNextPage, initialData.ratings.length],
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
