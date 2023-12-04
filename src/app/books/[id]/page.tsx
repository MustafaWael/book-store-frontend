import AddToCart from '@/components/cart/addToCart';
import BooksSection from '@/components/booksSection';
import Image from '@/components/image';
import {
  getBooks,
  getBook,
  getInventory,
  fetchBooks,
  getRating,
} from '@/lib/api/books';
import Container from '@/components/container';
import { BOOK_FORMATS } from '@/types';
import Rating from '@/components/rating';
import Feedback from '@/components/feedback';
import Comments from '@/components/comments';
import { cookies } from 'next/headers';
import AllFeedbacks from '@/components/modals/allFeedbacks';

export async function generateStaticParams() {
  const { books } = await getBooks();

  return books.map((book: any) => ({
    id: book._id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const accessToken = cookies().get('access_token')?.value;

  const { id } = params;
  const book = await getBook(id);

  const inventory = await getInventory(book._id);

  const getQuantity = (format: string): number => {
    return inventory?.quantity[format.toLowerCase()];
  };

  const getPrice = (format: string): number => {
    const lowercaseFormat =
      format.toLowerCase() as (typeof BOOK_FORMATS)[number];

    if (lowercaseFormat in book.price) {
      return book.price[lowercaseFormat];
    } else {
      // Handle the case where the format is not found
      throw new Error(`Price not found for format: ${format}`);
    }
  };

  const mapBookPricesToBooksList = () => {
    const prices = Object.keys(book.price).map((format) => {
      return {
        format,
        price: getPrice(format),
        quantity: getQuantity(format),
      };
    });

    return prices;
  };

  const booksList = mapBookPricesToBooksList();

  const data = await fetchBooks(1, 6);

  const isAlreadyRated = await getRating(book._id, accessToken!);

  return (
    <main className="min-h-screen">
      <Container>
        <section className="flex justify-center py-8">
          <div className="flex flex-col gap-6">
            <div className="flex gap-x-4 max-w-xl">
              <div className="w-[120px] h-[200px] relative flex mb-4 shrink-0">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  wrapperWidth="120px"
                  wrapperHeight="200px"
                  wrapperClassName="mx-auto"
                  skeletonClassName="rounded-xl"
                  style={{ objectFit: 'cover' }}
                  className="rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl text-foreground">
                  {book.title}
                </h1>

                <h2 className="text-base md:text-xl text-foreground mb-4">
                  {/* dash sympol */}
                  <span className="mr-1">—</span>
                  by{' '}
                  <span className="font-bold italic text-foreground/80 capitalize">
                    {book.author.name}
                  </span>{' '}
                  on{' '}
                  <span className="font-bold italic text-foreground/80">
                    {book.year}
                  </span>
                  <div className="mt-1">
                    <Rating rating={book.avarage_rating} readonly />
                  </div>
                </h2>

                <p className="text-foreground text-lg">{book.description}</p>
              </div>
            </div>

            <p className="text-lg text-foreground max-w-xl">{book.summary}</p>

            <div className="mt-4 pricing-card-grid">
              {booksList.map((item) => (
                <PriceCard
                  key={item.format}
                  price={item.price}
                  format={item.format}
                  inStock={item?.quantity}
                  bookId={book._id}
                />
              ))}
            </div>

            <div className="my-4">
              <Feedback bookId={book._id} rating={isAlreadyRated?.rating} />
            </div>

            <div>
              <Comments bookId={book._id} />
              <div className="flex justify-center">
                <AllFeedbacks bookId={book._id} />
              </div>
            </div>
          </div>
        </section>
      </Container>

      <section className="pb-20">
        <BooksSection
          books={data}
          pageNumber={data?.currentPage!}
          category="Paperback"
        />
        <BooksSection
          books={data}
          pageNumber={data?.currentPage!}
          category="Paperback"
        />
        <BooksSection
          books={data}
          pageNumber={data?.currentPage!}
          category="Paperback"
        />
      </section>
    </main>
  );
}

const PriceCard = ({
  price,
  format,
  inStock,
  bookId,
}: {
  price: number;
  format: string;
  inStock: number | undefined; // or you can use a more specific type like `number` if it's always defined
  bookId: string;
}) => {
  return (
    <article className="flex flex-col items-center p-4 border-[3.5px] border-border rounded-xl">
      <h3 className="text-foreground text-2xl font-bold">{format}</h3>
      <h4 className="text-primary text-3xl font-bold">${price}</h4>

      <AddToCart bookId={bookId} format={format} className="mt-4">
        Add to cart
      </AddToCart>

      {inStock && (
        <p className="text-foreground text-center mt-2 -mb-2">
          {inStock} Available
        </p>
      )}
    </article>
  );
};
