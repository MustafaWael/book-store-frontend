import Image from 'next/image';

type TestimonialUser = {
  name: string;
  image: string;
};

export type Testimonial = {
  content: string;
  user: TestimonialUser;
};

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <article className="flex flex-col items-center gap-y-12 bg-card text-card-foreground rounded-[50px] px-3 sm:px-6 py-12 sm:py-16 min-w-full sm:min-w-[400px] snap-center">
      <q className="text-2xl md:text-3xl text-center qoute mb-auto">
        {testimonial.content}
      </q>
      <div className="flex items-center gap-x-3 text-card-foreground/60">
        <Image
          src={testimonial.user.image}
          alt={testimonial.user.name}
          width={71}
          height={70}
          className="rounded-full"
        />
        — <h3 className="text-xl capitalize">{testimonial.user.name}</h3>
      </div>
    </article>
  );
}
