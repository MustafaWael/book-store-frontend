import { sleep } from '@/lib/utils/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

export type InfiniteScrollResponse<T> = {
  items: T[];
  totalBooks: number;
  currentPage: number;
  totalPages: number;
};

type UseInfiniteScrollProps<T> = {
  initialData: T[];
  pageNumber: number;
  limit: number;
  fetcher: (page: number, limit: number) => Promise<InfiniteScrollResponse<T> | undefined>;
};

export default function useInfiniteScroll<T>({
  initialData,
  pageNumber,
  limit,
  fetcher,
}: UseInfiniteScrollProps<T>) {
  // states
  const [page, setPage] = useState(pageNumber);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<T[]>(initialData);
  const [hasMore, setHasMore] = useState(true);

  // refs
  const isInitialMount = useRef(true);
  const observerRef = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          isInitialMount.current = false;
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore],
  );

  const getData = async () => {
    try {
      const res = await fetcher(page, 6);
      if (!res) return;

      await sleep(1000);
      setData((prevData) => [...prevData, ...res.items]);

      if (res.totalPages === page) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await sleep(1000);
      setIsFetching(false);
    }
  };

  // fetch data
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    setIsFetching(true);
    getData();
  }, [page]);

  return { data, isFetching, lastElementRef, hasMore };
}
