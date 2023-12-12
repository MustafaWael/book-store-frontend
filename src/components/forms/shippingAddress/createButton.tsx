'use client';
import { createShippingAddress } from '@/actions';
import { openCreateAddressModalAtom } from '@/atoms';
import SubmitButton from '@/components/buttons/submitButton';
import { sleep } from '@/lib/utils';
import { useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

export default function CreateShippingAddressButton() {
  const setOpenCreateAddressModalAtom = useSetAtom(openCreateAddressModalAtom);

  const action = async (formData: FormData) => {
    const res = await createShippingAddress(formData);
    if (res?.validationError) {
      const errorMessage = Object.values(res.validationError)[0];
      toast.error((errorMessage as string) || 'Something went wrong');
      return;
    }
    await sleep(2000);
    setOpenCreateAddressModalAtom(false);
  };

  return (
    <SubmitButton text="Create" loadingText="Creating..." formAction={action} />
  );
}
