import Container from '@/components/container';
import ShippingAddressForm from '@/components/forms/shippingAddress/shippingAddress';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookstore | Create Shipping Address',
  description: 'Create a new shipping address',
  openGraph: {
    title: 'Bookstore | Create Address',
    description: 'Create a new shipping address',
  },
};

export default function Page() {
  return (
    <Container asChild>
      <main className="flex flex-col items-center gap-y-5 py-5">
        <h1 className="text-center text-3xl text-foreground">Orders</h1>
        <div className="bg-card container py-5 rounded-2xl flex flex-col gap-y-6">
          <ShippingAddressForm actionType="create" />
        </div>
      </main>
    </Container>
  );
}
