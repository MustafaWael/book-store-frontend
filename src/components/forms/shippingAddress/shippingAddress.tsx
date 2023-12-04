import ShippingAddressSelects from './shippingAddressSelects';
import {
  getCountryCities,
  getCountryFromIP,
  getCountryStates,
} from '@/lib/api/external';
import { Address } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import UpdateShippingAddressButton from './updateButton';
import CreateShippingAddressButton from './createButton';
import { formatPhoneNumber } from '@/lib/utils';
// import DeleteShippingAddressButton from './deleteButton';

export type State = {
  name: string;
  state_code: string;
};

type ShippingAddressFormProps = {
  actionType: 'create' | 'update';
  address?: Address;
};

export default async function ShippingAddressForm({
  actionType,
  address,
}: ShippingAddressFormProps) {
  const country = await getCountryFromIP();
  const states = await getCountryStates(country);
  const cities = await getCountryCities(
    country,
    address?.state || states[0].name,
  );

  return (
    <form className="flex flex-col gap-y-6">
      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="fullName">
          Name
        </Label>
        <Input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Ex. Home, company"
          defaultValue={actionType === 'update' ? address?.fullName : ''}
        />
      </div>

      <div className="grid gird-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="addressLine1">
            Address Line one
          </Label>
          <Input
            type="text"
            id="addressLine1"
            name="addressLine1"
            placeholder="Street address, P.O. box"
            defaultValue={actionType === 'update' ? address?.addressLine1 : ''}
          />
        </div>

        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="addressLine2">
            Address Line two
          </Label>
          <Input
            type="text"
            id="addressLine2"
            name="addressLine2"
            placeholder="Apartment, suite, unit, building"
            defaultValue={actionType === 'update' ? address?.addressLine2 : ''}
          />
        </div>

        {actionType === 'update' ? (
          <ShippingAddressSelects
            country={country}
            states={states}
            defaultCity={address?.city}
            defaultState={address?.state}
            defaultCities={cities}
          />
        ) : (
          <ShippingAddressSelects
            country={country}
            states={states}
            defaultCities={cities}
          />
        )}

        <div className="flex flex-col">
          <Label className="mb-3" htmlFor="postalCode">
            Postal Code
          </Label>
          <Input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Postal code, ZIP code"
            defaultValue={actionType === 'update' ? address?.postalCode : ''}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="phoneNumber">
          Phone Number
        </Label>
        <Input
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Ex: +1 555-555-5555"
          defaultValue={
            actionType === 'update'
              ? formatPhoneNumber(address?.phoneNumber!)
              : ''
          }
        />
      </div>

      <div className="flex gap-x-3 self-end">
        {actionType === 'create' ? (
          <CreateShippingAddressButton />
        ) : (
          <div className='flex gap-x-2'>
            {/* <DeleteShippingAddressButton addressId={address?._id!} /> */}
            <UpdateShippingAddressButton addressId={address?._id!} />
          </div>
        )}
      </div>
    </form>
  );
}
