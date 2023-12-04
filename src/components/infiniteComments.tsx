'use client';

import useInfiniteBookRatings from '@/hooks/useRatings';
import { Rating, type GetBookRatingsResponse } from '@/types';
import { Loader2Icon } from 'lucide-react';
import { forwardRef } from 'react';

type InfiniteCommentsProps = {
  bookId: string;
  initialData: GetBookRatingsResponse;
};

export default function InfiniteComments({
  bookId,
  initialData,
}: InfiniteCommentsProps) {
  const { data, isFetching, hasNextPage, lastElementRef } =
    useInfiniteBookRatings({
      bookId,
      initialData,
      limit: 6,
    });

  const items = data.pages.map((page, index) => {
    return page.ratings.map((rating, index) => {
      if (hasNextPage) {
        return <RatingCard ref={lastElementRef} rating={rating} key={index} />;
      }
      return <RatingCard rating={rating} key={index} />;
    });
  });
  return (
    <div>
      {items}
      {isFetching && (
        <Loader2Icon className="text-foreground animate-spin mx-auto" />
      )}
    </div>
  );
}

const RatingCard = forwardRef<HTMLDivElement, { rating: Rating }>(
  function RatingCard({ rating }, ref) {
    return (
      <div ref={ref} className="flex flex-col gap-y-4">
        <div className="border border-border rounded-md p-4 mb-4">
          <div className="flex justify-between mb-2">
            <p className="text-foreground font-bold">{rating.username}</p>
            <p className="text-foreground/80 text-sm">
              {new Date(rating.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <p className="text-foreground">{rating.comment}</p>
          <div className="flex mt-2">
            <p className="text-yellow-500">{`Rating: ${rating.rating}/5`}</p>
          </div>
        </div>
      </div>
    );
  },
);
