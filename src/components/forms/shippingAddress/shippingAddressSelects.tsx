'use client';

import { useState } from 'react';
import { Button } from '../../ui/button';
import { ChevronDown } from 'lucide-react';
import FormSelect from '../fields/formSelect';
import { getCountryCities } from '@/lib/api/external';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type State = {
  name: string;
  state_code: string;
};

type ShippingAddressSelectsProps = {
  country: string;
  states: State[];
  defaultState?: string;
  defaultCity?: string;
  defaultCities?: string[];
};

export default function ShippingAddressSelects({
  country,
  states,
  defaultCities,
  defaultCity,
  defaultState,
}: ShippingAddressSelectsProps) {
  const [cities, setCities] = useState<string[]>(() => defaultCities || []);
  const [loadingCities, setLoadingCities] = useState(false);

  const onStateChange = async (state: string) => {
    setLoadingCities(true);
    const cities = await getCountryCities(country, state);
    setCities(cities);
    setLoadingCities(false);
  };

  return (
    <>
      {/* <div className="flex flex-col">
        <Label className="mb-3" htmlFor="Country">
          Country
        </Label>

        <Input
          type="text"
          defaultValue={country}
          name="country"
          hidden
        />
      </div> */}

      <FormSelect
        label="Country"
        name="country"
        options={[country]}
        defaultValue={country}
      />

      <FormSelect
        label="State"
        name="state"
        options={states?.map((state) => state.name)}
        onChange={(value) => onStateChange(value)}
        defaultValue={defaultState || states[0].name}
      />

      <FormSelect
        label="City"
        name="city"
        options={cities}
        loading={loadingCities}
        defaultValue={defaultCity || cities[0]}
      />
    </>
  );
}
