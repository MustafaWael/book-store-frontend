import { getShippingAddresses } from '@/lib/api/books';
import { Address } from '../profile/page';
import AddressSelect from '@/components/addressSelect';
import { cookies } from 'next/headers';
import Container from '@/components/container';
import { OpenCreateAddressModal } from '@/components/modals/createAddressModal';

export default async function ShippingAddress() {
  const accessToken = cookies().get('access_token')?.value!;

  const addressesRes: Address[] | { error: string } =
    await getShippingAddresses(accessToken);
  const addresses: Address[] = 'error' in addressesRes ? [] : addressesRes;

  return (
    <Container asChild>
      <main className="flex flex-col items-center gap-y-5 py-5">
        <h1 className="text-center text-3xl text-foreground">Create Order</h1>

        <div className="bg-card w-full max-w-xl p-4 md:p-8 rounded-2xl">
          <h2 className="text-xl text-card-foreground mb-3">
            Shipping Address
          </h2>
          {/* paragraph that is tells to select your addresses to ship the order to */}
          <p className="text-card-foreground/60 mb-6">
            Select one of your addresses to ship the order to, or{' '}
            <OpenCreateAddressModal variant={'link'} size={'icon'} className='h-fit'>
              create
            </OpenCreateAddressModal>{' '}
            a new address.
          </p>

          <div>
            <AddressSelect addresses={addresses} />
          </div>
        </div>
      </main>
    </Container>
  );
}
