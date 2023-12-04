import { getCategories } from '@/lib/api/books';
import Link from 'next/link';
import Container from './container';

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <Container asChild>
        <div className="py-20 flex flex-col md:flex-row gap-y-20 items-center justify-center">
          <h3 className="text-4xl lg:text-5xl font-kaushan flex items-center justify-center text-secondary-foreground order-2 md:order-1">
            Book Store
          </h3>
          <div className="flex flex-col md:flex-row gap-y-10 gap-x-40 mx-auto order-1 md:order-2">
            <div className="max-w-[100%] md:max-w-min">
              <h3 className="text-2xl lg:text-3xl text-secondary-foreground mb-3">
                Popular Categories
              </h3>
              <ul className="text-secondary-foreground/60">
                {(Array.isArray(categories) ? categories : []).map(
                  (category: { name: string; _id: string }) => (
                    <li key={category._id}>
                      <Link
                        href={`/books?category=${category.name}`}
                        className="capitalize"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="max-w-[100%] md:max-w-min">
              <h3 className="text-2xl lg:text-3xl text-secondary-foreground mb-3">
                Books Formats
              </h3>
              <ul className="text-secondary-foreground/60">
                <li>
                  <Link href="/books?format=paperback" className="capitalize">
                    Paperback
                  </Link>
                </li>
                <li>
                  <Link href="/books?format=hardcover" className="capitalize">
                    Hardcover
                  </Link>
                </li>
                <li>
                  <Link href="/books?format=ebook" className="capitalize">
                    Ebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <div className="bg-background px-4 py-8 flex items-center justify-center text-xl flex-wrap text-secondary-foreground">
        © 2023 All Rights Reserved.
        <span className="text-secondary-foreground ml-2">BookStore</span>
      </div>
    </footer>
  );
}
