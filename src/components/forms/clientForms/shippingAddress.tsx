'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import validator from 'validator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  getCountryCities,
  getCountryFromIP,
  getCountryStates,
} from '@/lib/api/external';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState, useTransition } from 'react';
import { createShippingAddress, updateShippingAddress } from '@/actions';
import toast from 'react-hot-toast';
import { Loader2Icon } from 'lucide-react';
import { openCreateAddressModalAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { Address } from '@/types';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  addressLine1: z.string().min(2, {
    message: 'address line 1 must be at least 2 characters.',
  }),
  addressLine2: z.string().min(2, {
    message: 'address line 2 must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'country must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'state must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'city must be at least 2 characters.',
  }),
  postalCode: z
    .string()
    .refine((postalCode) => validator.isPostalCode(postalCode, 'any'), {
      message: 'invalid postal code.',
    }),
  phoneNumber: z.string().refine(
    async (number) => {
      const countryFromIP = await getCountryFromIP();
      const r = await fetch(
        `https://restcountries.com/v3.1/name/${countryFromIP}?fields=languages,cca2`,
      );
      const data = await r.json();
      const country = data[0] as {
        languages: Record<string, string>;
        cca2: string;
      };
      const f = Object.entries(country.languages)[0][1]
        .toLowerCase()
        .slice(0, 2);
      console.log({ f });
      const locale = `${f}-${country.cca2}`;
      console.log({ locale });
      return validator.isMobilePhone(number, 'ar-EG');
    },
    {
      message: 'invalid phone number.',
    },
  ),
});

type ShippingAddressFormProps = {
  actionType: 'create' | 'update';
  address?: Address;
};

export function ShippingAddressForm({
  actionType,
  address,
}: ShippingAddressFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: address?.fullName || '',
      addressLine1: address?.addressLine1 || '',
      addressLine2: address?.addressLine2 || '',
      country: address?.country || '',
      state: address?.state || '',
      city: address?.city || '',
      postalCode: address?.postalCode || '',
      phoneNumber: address?.phoneNumber || '',
    },
  });

  form.watch('state');
  form.watch('city');

  const [creatingAddress, setCreatingAddress] = useState(false);

  const { data: country, isLoading: isFetchingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountryFromIP,
    enabled: !address,
  });

  const { data: countryStates, isLoading: isFetchingCountryStates } = useQuery({
    queryKey: ['countryStates', country],
    queryFn: () => getCountryStates(address?.country || country),
    enabled: country && !isFetchingCountry,
  });

  const { data: countryCities, isLoading: isFetchingCountryCities } = useQuery({
    queryKey: ['countryCities', country, form.getValues('state')],
    queryFn: () =>
      getCountryCities(address?.country || country, form.getValues('state')),
    enabled: !!form.getValues('state') && !isFetchingCountryStates,
  });

  const setOpenCreateAddressModalAtom = useSetAtom(openCreateAddressModalAtom);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setCreatingAddress(true);
    const data =
      actionType === 'create'
        ? await createShippingAddress(values)
        : await updateShippingAddress(address?._id!, values);

    if (!data.error && data) {
      setCreatingAddress(false);
      toast.success(
        `Shipping address ${
          actionType === 'create' ? 'created' : 'updated'
        } successfully`,
      );
      setOpenCreateAddressModalAtom(false);
    }
  }

  useEffect(() => {
    if (country) {
      form.setValue('country', country);
    }
  }, [country, form]);

  const state = form.getValues('state');

  useEffect(() => {
    form.resetField('city', {
      defaultValue: undefined,
    });
  }, [isFetchingCountryStates, isFetchingCountryCities, state, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="Shipping address name" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the name of your shipping address. For example, you
                can type home or company. This will help you to identify your
                shipping address. You can change this name later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address line one</FormLabel>
              <FormControl>
                <Input placeholder="address line one" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the first line of your shipping address. For
                example, you can type your street address, company name, c/o,
                etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>address line two</FormLabel>
              <FormControl>
                <Input placeholder="address line two" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the second line of your shipping address. For
                example, you can type your apartment, suite, unit, building,
                floor, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>country</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={isFetchingCountry ? 'loading...' : country}
                />
              </FormControl>
              <FormDescription>
                Please enter the country of your shipping address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>state</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={'Select your state'}>
                      {field.value || 'Select your state'}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countryStates?.map((state) => (
                    <SelectItem key={state.state_code} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please enter the state of your shipping address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>city</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!form.getValues('state')}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city">
                      {field.value || 'Select your city'}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(countryCities || []).map((city: string) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}

                  {isFetchingCountryCities && (
                    <div className="flex flex-col gap-2">
                      <Skeleton className="w-full h-8" />
                      <Skeleton className="w-full h-8" />
                      <Skeleton className="w-full h-8" />
                      <Skeleton className="w-full h-8" />
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormDescription>
                Please enter the city of your shipping address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>postal code</FormLabel>
              <FormControl>
                <Input placeholder="postal code" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the postal code of your shipping address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>phone number</FormLabel>
              <FormControl>
                <Input placeholder="phone number" type="tel" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the phone number of your shipping address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {creatingAddress ? (
            <>
              {actionType === 'create' ? 'Creating' : 'Updating'}{' '}
              <Loader2Icon size={18} className="animate-spin ml-2" />
            </>
          ) : actionType === 'create' ? (
            'Create'
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </Form>
  );
}
