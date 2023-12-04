import Image from '@/components/image';
import Tag from './tag';
import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { BookResponse } from '@/types';
import Rating from './rating';

type BookCardProps = {
  book: BookResponse;
};

export default React.forwardRef<HTMLDivElement, BookCardProps>(
  function BookCard({ book }, ref) {
    return (
      <article
        ref={ref}
        className="bg-card border-border border-4 text-card-foreground rounded-2xl snap-center h-[inherit] flex flex-col"
      >
        {/* image */}
        <section className="px-2.5 pt-2.5 ">
          <Image
            src={book.cover}
            skeletonClassName="rounded-2xl"
            width={283}
            height={161}
            alt={book.title}
            className="object-cover object-center rounded-2xl select-none pointer-events-none"
            wrapperClassName='flex justify-center'
          />
        </section>

        {/* tags */}
        <section className="flex gap-x-1.5 px-6 py-1.5 mt-2 justify-center">
          {Object.keys(book.price).map((format, index) => (
            <Tag name={format} key={index} />
          ))}
        </section>

        <section className="p-4 text-card-foreground flex flex-col h-full">
          {/* title */}
          <h2 className="text-2xl md:text-3xl capitalize">{book.title}</h2>

          {/* author */}
          <p className="text-base md:text-xl mt-2">
            <span className="mr-1">—</span>
              by{' '}
              <span className="font-bold text-card-foreground/60 capitalize">
                {book.author.name}
              </span>
          </p>

          {/* Rating  */}
          <div className="mt-2">
            <Rating rating={book.avarage_rating} readonly />
          </div>

          {/* description */}
          <p className="text-sm md:text-base text-card-foreground/60 mt-4">
            {book.description}
          </p>

          {/* price */}
          <div className="flex justify-between items-center mt-auto pt-9 h-fit">
            <p className="text-3xl text-card-foreground">
              ${book.price.paperback}
            </p>

            <Link href={`/books/${book._id}`} tabIndex={-1}>
              <Button className="w-full" variant="default">
                View Book <ArrowRight className="ml-2" size={20} />{' '}
              </Button>
            </Link>
          </div>
        </section>
      </article>
    );
  },
);
