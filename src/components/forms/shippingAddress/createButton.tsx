'use client';
import { createShippingAddress } from '@/actions';
import { openCreateAddressModalAtom } from '@/atoms';
import SubmitButton from '@/components/buttons/submitButton';
import { sleep } from '@/lib/utils';
import { useSetAtom } from 'jotai';

export default function CreateShippingAddressButton() {
  const setOpenCreateAddressModalAtom = useSetAtom(openCreateAddressModalAtom);

  return (
    <SubmitButton
      text="Create"
      loadingText="Creating..."
      formAction={async (formdata: FormData) => {
        await createShippingAddress(formdata);
        await sleep(2000);
        setOpenCreateAddressModalAtom(false);
      }}
    />
  );
}
