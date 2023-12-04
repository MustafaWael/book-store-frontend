import Container from '@/components/container';
import ShippingAddressForm from '@/components/forms/shippingAddress/shippingAddress';

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
