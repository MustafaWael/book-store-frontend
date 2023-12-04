import BooksSection from '@/components/booksSection';
import Header from '@/components/header';
import { Testimonial } from '@/components/testimonialCard';
import TestimonialsSection from '@/components/testimonialsSection';
import { fetchBooks } from '@/lib/api/books';

const testimonials: Testimonial[] = [
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
  {
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    user: {
      name: 'John Doe',
      image: '/Ellipse.png',
    },
  },
];

export default async function Home() {
  const data = await fetchBooks(1, 6);

  return (
    <>
      <Header />
      <main className="w-full pt-[calc(100lvh-150px)] z-20 relative">
        <section className="pb-20">
          <BooksSection
            books={data!}
            pageNumber={data?.currentPage!}
            category="Paperback"
          />
          <BooksSection
            books={data!}
            pageNumber={data?.currentPage!}
            category="Paperback"
          />
          <BooksSection
            books={data!}
            pageNumber={data?.currentPage!}
            category="Paperback"
          />
        </section>
        <TestimonialsSection testimonials={testimonials} />
      </main>
    </>
  );
}
