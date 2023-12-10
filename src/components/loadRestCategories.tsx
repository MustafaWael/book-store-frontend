'use client';

import Link from 'next/link';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { ArrowDownIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
type SearchParams = {
  category?: string;
  format?: string;
};

type LoadRestCategoriesProps = {
  categories: { name: string; _id: string }[];
  limit: number;
  searchParams: SearchParams;
};

export default function LoadRestCategories({
  categories,
  searchParams,
  limit,
}: LoadRestCategoriesProps) {
  const [isOpened, setIsOpened] = useState(false);

  const createLink = (_searchParams: SearchParams) => {
    const params = new URLSearchParams({ ...searchParams, ..._searchParams });
    return `/books?${params.toString()}`;
  };

  const handleClick = () => {
    setIsOpened((prev) => {
      return !prev;
    });
  };

  const rest = categories.slice(limit);

  return (
    <>
      {isOpened
        ? rest.map((category: { name: string; _id: string }) => (
            <li key={category._id}>
              <Link
                href={createLink({ category: category.name })}
                className={`flex gap-x-2 items-center`}
              >
                <Checkbox
                  id={category.name}
                  checked={category.name === searchParams.category}
                />
                <Label
                  htmlFor={category.name}
                  className={`capitalize cursor-pointer ${
                    category.name === searchParams.category
                      ? 'text-card-foreground'
                      : 'text-card-foreground/60'
                  }`}
                >
                  {category.name}
                </Label>
              </Link>
            </li>
          ))
        : null}
      <Button className="mt-4" onClick={handleClick}>
        <span>
          {isOpened ? 'Hide' : `+${categories.length - limit} more categories`}
        </span>
        <ArrowDownIcon
          size={18}
          className={cn(
            'transform transition-transform ml-2',
            isOpened && 'rotate-180',
          )}
        />
      </Button>
    </>
  );
}
