import { getBooks, getCategories } from '@/lib/api/books';
import Link from 'next/link';
import Container from '@/components/container';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import InfiniteLoadBooks from '@/components/infiniteLoadBooks';
import LoadRestCategories from '@/components/loadRestCategories';

type SearchParams = {
  category?: string;
  format?: string;
};

type PageProps = {
  searchParams: SearchParams;
};

type BookFormat = 'paperback' | 'hardcover' | 'ebook';

const bookFormats: BookFormat[] = ['paperback', 'hardcover', 'ebook'];

const LIMIT = 10;

export default async function page({ searchParams }: PageProps) {
  // fetch books by category and format
  const books = await getBooks({
    ...searchParams,
    pageSize: `${LIMIT}`,
  });
  const { categories } = await getCategories(1, 50);

  const createLink = (_searchParams: SearchParams) => {
    const params = new URLSearchParams({ ...searchParams, ..._searchParams });
    return `/books?${params.toString()}`;
  };

  const firistCategories = categories.slice(0, LIMIT);

  return (
    <Container asChild>
      <main className="flex flex-col md:flex-row gap-x-8 gap-y-4 py-5">
        <section className="bg-card p-5 rounded-2xl h-fit min-w-max md:sticky top-[120px] left-0">
          <h3 className="text-xl text-foreground mb-2">Categories</h3>
          <ul className="flex flex-col gap-y-2">
            {firistCategories.map((category: { name: string; _id: string }) => (
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
            ))}

            <LoadRestCategories
              categories={categories}
              limit={LIMIT}
              searchParams={searchParams}
            />
          </ul>

          <h3 className="text-xl text-foreground mb-2 mt-6">Books Formats</h3>
          <ul className="flex flex-col gap-y-2">
            {bookFormats.map((format) => (
              <li key={format}>
                <Link
                  href={createLink({ format })}
                  className={`flex gap-x-2 items-center`}
                >
                  <Checkbox
                    id={format}
                    checked={format === searchParams.format}
                  />
                  <Label
                    htmlFor={format}
                    className={`capitalize cursor-pointer ${
                      format === searchParams.format
                        ? 'text-card-foreground'
                        : 'text-card-foreground/60'
                    }`}
                  >
                    {format}
                  </Label>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <InfiniteLoadBooks
          books={books}
          category={searchParams.category}
          limit={10}
        />
      </main>
    </Container>
  );
}
