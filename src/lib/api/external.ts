import { State } from '@/components/forms/shippingAddress/shippingAddress';

export const getCountryFromIP = async () => {
  const res = await fetch('https://ip-api.com/json');
  const data = await res.json();
  return data.country;
};

export const getCountryStates = async (country: string): Promise<State[]> => {
  const res = await fetch(
    `https://countriesnow.space/api/v0.1/countries/states`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
      }),
    },
  );
  const { data } = await res.json();
  return data?.states;
};

export const getCountryCities = async (country: string, state: string) => {
  const res = await fetch(
    `https://countriesnow.space/api/v0.1/countries/state/cities`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        state,
      }),
    },
  );
  const { data } = await res.json();
  return data;
};
