import Container from './container';
import TestimonialCard, { Testimonial } from './testimonialCard';

type TestimonialProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialProps) {
  return (
    <section className="bg-secondary py-20">
      <h2 className="text-2xl md:text-3xl mb-12 text-center text-secondary-foreground">
        What our customers say
      </h2>

      <Container asChild>
        <div className="flex flex-col sm:flex-row gap-8 overflow-x-auto snap-x snap-mandatory will-change-scroll remove-scrollbar xl:mask-slider">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard testimonial={testimonial} key={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
