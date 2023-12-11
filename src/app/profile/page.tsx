import { getShippingAddresses } from '@/lib/api/books';
import ChangePasswordForm from '@/components/forms/changePassword';
import ProfileSettingsForm from '@/components/forms/changeUserDetails';
// import ShippingAddressForm from '@/components/forms/shippingAddress/shippingAddress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getUser } from '@/lib/api/auth';
import { cookies } from 'next/headers';
import Container from '@/components/container';
import { OpenCreateAddressModal } from '@/components/modals/createAddressModal';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ShippingAddressForm } from '@/components/forms/clientForms/shippingAddress';

export type Address = {
  _id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  __v: number;
};

export default async function Profile() {
  const accessToken = cookies().get('access_token')?.value!;
  const user = await getUser(accessToken);

  const addressesRes: Address[] | { error: string } =
    await getShippingAddresses(accessToken);
  const addresses: Address[] = 'error' in addressesRes ? [] : addressesRes;

  return (
    <Container asChild>
      <main className="flex flex-col items-center gap-y-5 py-5">
        <h1 className="text-center text-3xl text-foreground">
          Profile Settings
        </h1>
        <div className="bg-card w-full max-w-lg  rounded-2xl">
          <div>
            <h2 className="text-xl text-card-foreground mb-1">User Details</h2>
            <p className="text-card-foreground/60 mb-6">
              Update your user details here
            </p>
            <ProfileSettingsForm name={user.name} email={user.email} />
          </div>

          <div className="my-10">
            <h2 className="text-xl text-card-foreground mb-1">
              Change Password
            </h2>
            <p className="text-card-foreground/60 mb-6">
              {' '}
              Change your password here
            </p>
            <ChangePasswordForm />
          </div>

          {/* Address */}
          {/* accordions */}

          <div>
            <h2 className="text-xl text-card-foreground mb-1">Addresses</h2>
            <p className="text-card-foreground/60 mb-6">
              Add or update your addresses here
            </p>
            <Accordion
              type="single"
              collapsible
              className="w-full text-card-foreground flex flex-col gap-y-3"
            >
              {addresses.map((address) => (
                <AccordionItem
                  key={address._id}
                  value={address._id}
                  className="border-none"
                >
                  <div className="bg-secondary text-secondary-foreground py-1 px-4 rounded-2xl">
                    <AccordionTrigger className="hover:no-underline text-card-foreground px-1">
                      {address.fullName}
                    </AccordionTrigger>
                    <AccordionContent className="px-1">
                      <div className="py-2">
                        <ShippingAddressForm
                          actionType="update"
                          address={address}
                        />
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex justify-center mt-4">
              <OpenCreateAddressModal />
            </div>
          </div>

          {/* section for let user show his orders */}
          {/* i will push the user to the /orders route to show them */}
          <div className="my-10">
            <h2 className="text-xl text-card-foreground mb-1">Orders</h2>
            <p className="text-card-foreground/60 mb-6">
              View your orders here
            </p>
            <div className="flex justify-center">
              <Link href={'/orders'} className={buttonVariants()}>
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
