'use client';
import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { rateBook, updateRating } from '@/actions';
import { type Rating } from '@/types';

type RatingProps =
  | {
      rating?: number;
      bookId: string;
      readonly?: false;
      className?: string;
      size?: number;
      starsGap?: number;
      isColumn?: boolean;
      onRatingChange?: (newRating: Rating) => void;
    }
  | {
      rating?: number;
      bookId?: string;
      readonly: true;
      className?: string;
      size?: number;
      starsGap?: number;
      isColumn?: boolean;
      onRatingChange?: (newRating: Rating) => void;
    };

export default function Rating({
  rating: defaultRating = 0,
  bookId,
  readonly,
  onRatingChange = () => {},
  className,
  size,
  starsGap = 0,
  isColumn,
}: RatingProps) {
  const [rating, setRating] = useState(() => Math.ceil(defaultRating));
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleRatingChange = (newRating: number) => {
    if (!readonly) {
      setRating(newRating);
      startTransition(async () => {
        const createdRating = await rateBook(bookId, newRating);
        onRatingChange(createdRating);
        if (createdRating?.error) {
          if (createdRating.error === 'User already rated') {
            const updatedRating = await updateRating(bookId, {
              rating: newRating,
            });
            onRatingChange(updatedRating);
          }
        }
      });
    }
  };

  const handleHover = (index: number) => {
    if (!readonly) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoveredIndex(0);
    }
  };

  return (
    <div
      className={cn(
        className,
        'flex items-center',
        starsGap && `gap-x-${starsGap}`,
        isPending && 'animate-pulse',
        isColumn && 'flex-col',
      )}
    >
      <div>
        {[...Array(5)].map((_, i) => {
          return (
            <Star
              key={i}
              filled={rating > i || (hoveredIndex ?? -1) > i}
              onHover={() => handleHover(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleRatingChange(i + 1)}
              readonly={readonly}
              size={size}
            />
          );
        })}
      </div>

      <span className={cn('ml-2 text-sm text-foreground', isColumn && 'ml-0')}>
        {rating.toFixed(1)} ({rating})
      </span>
    </div>
  );
}

type StarProps = {
  filled: boolean;
  readonly?: boolean;
  size?: number;
  onHover: () => void;
  onClick: () => void;
  onMouseLeave: () => void;
};

export function Star({
  filled,
  onHover,
  onMouseLeave,
  onClick,
  readonly,
  size = 18,
}: StarProps) {
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className={cn('hover:bg-transparent w-fit h-fit p-0')}
      style={{
        cursor: readonly ? 'inherit' : 'pointer',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={readonly ? -1 : 0}
    >
      <StarIcon
        className={cn(
          'transition-all duration-200 inline-flex fill-secondary text-secondary ',
          filled && 'fill-yellow-600 text-yellow-600',
          readonly ||
            'hover:text-yellow-400 hover:scale-110 hover:fill-yellow-400',
        )}
        size={size}
      />
    </Button>
  );
}
