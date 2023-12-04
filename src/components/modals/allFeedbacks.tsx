import { getBookRatings } from '@/lib/api/books';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import InfiniteComments from '../infiniteComments';

type AllFeedbacksProps = {
  bookId: string;
};

export default async function AllFeedbacks({ bookId }: AllFeedbacksProps) {
  const ratings = await getBookRatings(bookId);

  return (
    <Dialog>
      {ratings.ratings.length > 0 && (
        <DialogTrigger asChild>
          <Button>All Feedbacks</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All Feedbacks</DialogTitle>
          <DialogDescription>
            This address will be saved to your account and can be used for your
            next order.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <InfiniteComments bookId={bookId} initialData={ratings} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
