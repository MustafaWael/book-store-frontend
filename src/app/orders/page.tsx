import CancelOrderButton from '@/components/buttons/cancelOrderButton';
import DeleteOrderButton from '@/components/buttons/deleteOrderButton';
import DownloadBookButton from '@/components/buttons/downloadBookButton';
import Container from '@/components/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { fetchAddress, fetchBook, fetchOrders } from '@/lib/api/books';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bookstore | Orders',
  description: 'View your orders',
  openGraph: {
    title: 'Bookstore | Orders',
    description: 'View your orders',
  },
};

export default async function Orders() {
  const accessToken = cookies().get('access_token')?.value!;
  if (!accessToken) return null;

  const fetchedOrders = (await fetchOrders(accessToken)) || { orders: [] };

  const mapOrders = async () => {
    const _orders: any[] = [];

    for (const order of fetchedOrders) {
      const booksList: any[] = [];
      for (const book of order.books) {
        const bookData = (await fetchBook(book.book)) as any;

        // tslint:disable-next-line: no-any
        const _book: any = { ...book } as any;
        _book.format = [book.format];
        _book.price = [
          { format: book.format, price: bookData.price[book.format] },
        ];
        _book.title = bookData.title;

        if (booksList.find((b) => b.book === book.book)) {
          const bookIndex = booksList.findIndex((b) => b.book === book.book);
          booksList[bookIndex].format.push(book.format);
          booksList[bookIndex].price.push({
            format: book.format,
            price: bookData.price[book.format],
          });
          break;
        }

        booksList.push(_book);
      }
      _orders.push({ ...order, booksList });
    }

    return _orders;
  };

  const orders = await mapOrders();

  return (
    <Container asChild>
      <main className="flex flex-col items-center gap-y-5 py-5">
        <h1 className="text-center text-3xl text-foreground">Orders</h1>
        <div className="bg-card w-full max-w-md p-8 rounded-2xl flex flex-col gap-y-6">
          {/* list of orders */}
          <Accordion
            type="single"
            collapsible
            className="w-full text-card-foreground flex flex-col gap-y-3"
          >
            {orders.map((order: any) => (
              <AccordionItem
                value={order._id}
                key={order._id}
                className="border-none"
              >
                <div className="bg-secondary text-secondary-foreground py-1 px-4 rounded-2xl">
                  <AccordionTrigger className="flex justify-between hover:no-underline">
                    <AddressName addressId={order.address} />
                    <span className={`text-sm ml-auto mr-4`}>
                      {order.status}
                    </span>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="px-1">
                  <div className="bg-secondary text-secondary-foreground py-4 px-1 rounded-2xl mt-3">
                    <div className="flex flex-col gap-y-6 px-2">
                      {order.booksList.map((book: any) => (
                        <>
                          <Book
                            key={book._id}
                            bookId={book.book}
                            prices={book.price}
                            isPaid={order.status}
                            orderId={order._id}
                            title={book.title}
                          />
                        </>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2 px-2 justify-end flex-wrap">
                      <DeleteOrderButton
                        orderId={order._id}
                        variant={'destructive'}
                      />

                      {order.status === 'pending' && (
                        <CancelOrderButton
                          orderId={order._id}
                          variant={'destructive'}
                        />
                      )}

                      {order.status === 'pending' && (
                        <Link href={order.checkoutUrl}>
                          <Button className="flex items-center">
                            Pay <ArrowRight size={18} className="ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </Container>
  );
}

const AddressName = async ({ addressId }: { addressId: string }) => {
  const accessToken = cookies().get('access_token')?.value!;
  if (!accessToken) return null;
  const address = await fetchAddress(addressId, accessToken);
  if (!address) return null;

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-row gap-x-2">
        <span className="text-sm">{address?.fullName}</span>
      </div>
    </div>
  );
};

const Book = async ({
  bookId,
  isPaid,
  orderId,
  prices,
  title,
}: {
  bookId: string;
  isPaid: boolean;
  orderId: string;
  prices: [any];
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="text-lg mb-2">{title}</h3>
      <div className="flex flex-col sm:flex-row gap-2 grow w-full">
        {prices.map((price: any, index) => (
          <PriceCard
            key={index}
            isPaid={isPaid}
            price={price}
            bookTitle={title}
            orderId={orderId}
            bookId={bookId}
          />
        ))}
      </div>
    </div>
  );
};

const PriceCard = ({
  price,
  bookTitle,
  orderId,
  bookId,
  isPaid,
}: {
  price: any;
  bookTitle: string;
  orderId: string;
  bookId: string;
  isPaid: boolean;
}) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex flex-col bg-card p-4 rounded-xl items-center">
          <h4 className="text-base">{price?.format}</h4>
          <span className="text-sm">${price?.price}</span>
        </div>
        {isPaid && price?.format === 'ebook' && (
          <DownloadBookButton
            title={bookTitle}
            orderId={orderId}
            bookId={bookId}
          />
        )}
      </div>
    </>
  );
};
