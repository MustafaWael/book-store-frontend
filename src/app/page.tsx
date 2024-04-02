import BooksSection from '@/components/booksSection';
import Header from '@/components/header';
import { Testimonial } from '@/components/testimonialCard';
import TestimonialsSection from '@/components/testimonialsSection';
import { getCategories } from '@/lib/api/books';
import { Metadata } from 'next';

const testimonials: Testimonial[] = [
  {
    content:
      'I absolutely love the variety of books available on this platform. The user-friendly interface makes it easy to discover new titles and authors. Highly recommended!',
    user: {
      name: 'Alice Johnson',
      image: '/alice_profile.jpg',
    },
  },
  {
    content:
      'The quick delivery and excellent packaging exceeded my expectations. I received my order in perfect condition. The attention to detail is commendable.',
    user: {
      name: 'David Smith',
      image: '/david_profile.jpg',
    },
  },
  {
    content:
      "The book recommendations based on my preferences are spot-on. It's like the app knows exactly what I like to read. Kudos to the recommendation algorithm!",
    user: {
      name: 'Emily Thompson',
      image: '/emily_profile.jpg',
    },
  },
  {
    content:
      'The customer support team is responsive and helpful. I had a query about my order, and they resolved it promptly. Great service!',
    user: {
      name: 'Michael Davis',
      image: '/michael_profile.jpg',
    },
  },
  {
    content:
      'The reading community here is fantastic. I enjoy participating in discussions and sharing my thoughts with fellow book enthusiasts. A great platform for bibliophiles!',
    user: {
      name: 'Sophia Brown',
      image: '/sophia_profile.jpg',
    },
  },
  {
    content:
      "The app's layout is intuitive, and the search functionality makes it easy to find specific genres or authors. It has become my go-to place for buying books online.",
    user: {
      name: 'Ryan Wilson',
      image: '/ryan_profile.jpg',
    },
  },
];

export const metadata: Metadata = {
  title: 'Bookstore | Buy Books Online at Affordable Prices',
  description: 'Buy books online at affordable prices from Bookstore.',
  openGraph: {
    title: 'Bookstore | Buy Books Online at Affordable Prices',
    description: 'Buy books online at affordable prices from Bookstore.',
    images: ['/hero-for-light.jpg'],
  },
};

export default async function Home() {
  const { categories } = await getCategories(1, 3).catch(() => ({ categories: [] }));

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
