import BooksSection from '@/components/booksSection';
import Header from '@/components/header';
import { Testimonial } from '@/components/testimonialCard';
import TestimonialsSection from '@/components/testimonialsSection';
import { getCategories } from '@/lib/api/books';

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
  const { categories } = await getCategories(1, 3);

  return (
    <>
      <Header />
      <main className="w-full pt-[calc(100lvh-150px)] z-20 relative">
        <section className="pb-20">
          {categories.map((category) => (
            <BooksSection key={category._id} category={category.name} />
          ))}
        </section>
        <TestimonialsSection testimonials={testimonials} />
      </main>
    </>
  );
}
