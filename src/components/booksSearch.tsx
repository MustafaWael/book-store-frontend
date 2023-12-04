'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Loader2Icon, SearchIcon } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/lib/api/books';
import useDebounce from '@/hooks/useDebounce';
import Image from './image';
import Tag from './tag';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BooksSearch() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching } = useQuery({
    queryKey: ['books-search', debouncedSearch],
    queryFn: async () => await getBooks({ query: search }),
    enabled: debouncedSearch.length > 0,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={buttonVariants({ variant: 'secondary', size: 'icon' })}
      >
        <SearchIcon size={24} />
      </PopoverTrigger>
      <PopoverContent className="md:w-96" sideOffset={5}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books..."
          className="w-full"
        />

        {isFetching ? (
          <div className="flex justify-center mt-4">
            <Loader2Icon size={24} className="animate-spin" />
          </div>
        ) : data?.books?.length === 0 ? (
          <div className="flex justify-center mt-4">
            <p className="text-base text-card-foreground/60">
              No books found with this query
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-y-3 w-full overflow-x-auto remove-scrollbar mask-slider">
            {data?.books?.map((book) => (
              <Link
                key={book._id}
                className={cn(
                  buttonVariants(),
                  'flex gap-x-2 outline-4 w-fit h-fit bg-transparent hover:bg-transparent items-start p-0',
                )}
                href={`/books/${book._id}`}
                onClick={() => setOpen(false)}
              >
                <div className="w-[80px] h-[120px] relative flex shrink-0">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    wrapperWidth="80px"
                    wrapperHeight="120px"
                    wrapperClassName="mx-auto"
                    skeletonClassName="rounded-md"
                    style={{ objectFit: 'cover' }}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <div className="flex gap-x-1.5">
                    {Object.keys(book.price).map((format, index) => (
                      <Tag name={format} key={index} className="text-xs" />
                    ))}
                  </div>
                  <p className="font-bold text-card-foreground text-xl">{book.title}</p>
                  <p className="text-card-foreground/60 text text-lg">
                    <span className="mr-1">—</span>
                    by{' '}
                    <span className="font-bold text-card-foreground/60 capitalize">
                      {book.author.name}
                    </span>
                    <span className="mx-1">-</span>
                    {/* year */}
                    <span className="font-bold text-card-foreground/60">
                      {book.year}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
