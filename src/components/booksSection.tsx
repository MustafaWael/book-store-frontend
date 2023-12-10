import Link from 'next/link';
import BooksSlider from './booksSlider';
import { ArrowRightIcon } from 'lucide-react';
import { getBooks } from '@/lib/api/books';

type BooksSectionProps = {
  category: string;
};

export default async function BooksSection({ category }: BooksSectionProps) {
  const books = await getBooks({ category });

  return (
    <section className="py-12">
      <div className="flex justify-between items-center text-foreground mb-5 container">
        <h2 className="text-xl md:text-3xl">{category}</h2>
        <Link
          href={{
            pathname: '/books',
            query: { category },
          }}
          className="flex items-center gap-x-3 text-foreground"
        >
          <span className="text-lg">View All</span>
          <ArrowRightIcon size={20} />
        </Link>
      </div>
      <BooksSlider books={books} category={category} />
    </section>
  );
}
