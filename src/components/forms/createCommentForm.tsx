'use client';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { updateRating } from '@/actions';
import SubmitButton from '../buttons/submitButton';
import toast from 'react-hot-toast';

export default function CreateCommentForm({
  bookId,
  className,
  ratingId,
  onComment = () => {},
}: {
  bookId: string;
  ratingId: string | null;
  className?: string;
  onComment?: (comment: string) => void;
}) {
  const [comment, setComment] = useState('');

  const action = async () => {
    if (!ratingId) {
      return toast.error('You must rate the book first');
    }

    await updateRating(bookId, { comment });
    toast.success('Comment posted successfully');
    setComment('');
    onComment(comment);
  };

  return (
    <form className={className} action={action}>
      <div className="flex items-center space-x-2">
        <Textarea
          placeholder="Write a comment..."
          className="flex-grow"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="flex justify-end mt-2">
        <SubmitButton
          text="Post"
          loadingText="Posting"
          disabled={comment.length === 0}
        />
      </div>
    </form>
  );
}
