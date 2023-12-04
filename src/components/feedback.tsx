'use client';
import { Button } from '@/components/ui/button';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import CreateCommentForm from './forms/createCommentForm';
import Rating from './rating';

export default function Feedback({
  bookId,
  rating,
}: {
  bookId: string;
  rating?: number;
}) {
  const [open, setOpen] = useState(false);
  const [ratingId, setRatingId] = useState<string | null>('');

  return (
    <div>
      <h3 className="font-bold text-2xl">Like what you see?</h3>
      <p className="text-base text-card-foreground/60">
        Help us improve by giving us feedback on our website and our books 🙏
      </p>
      <Button
        variant="secondary"
        className="flex gap-x-1.5 items-center mt-4"
        onClick={() => setOpen(true)}
      >
        <StarIcon size={18} />
        <span>
          {rating ? "Edit Your Feedback" : `Give Feedback`}
        </span>
      </Button>

      <Dialog defaultOpen open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Like what you see?</DialogTitle>
            <DialogDescription>
              Help us improve by giving us feedback on our website and our books
              🙏
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="flex justify-center mb-12">
              <Rating
                bookId={bookId}
                rating={rating || 0}
                size={35}
                starsGap={4}
                onRatingChange={(rating) => setRatingId(rating._id)}
              />
            </div>

            <h3>
              <span className="font-bold">Comment</span> (optional)
            </h3>
            <p className="mb-6 text-sm text-foreground/80">
              <span className="font-bold">Note:</span> Your comment will be
              public and will be shown on the book page.
            </p>

            <CreateCommentForm
              bookId={bookId}
              ratingId={ratingId}
              onComment={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
