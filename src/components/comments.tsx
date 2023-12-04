import { getBookRatings } from '@/lib/api/books';

type CommentsProps = {
  bookId: string;
};

export default async function Comments({ bookId }: CommentsProps) {
  const { ratings } = await getBookRatings(bookId);

  return (
    <div className="max-w-2xl mx-auto">
      {ratings.map((rating, index) => (
        <div key={index} className="border border-border rounded-md p-4 mb-4">
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
      ))}
    </div>
  );
}
