'use client';
import { updateShippingAddress } from '@/actions';
import SubmitButton from '@/components/buttons/submitButton';
import { sleep } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function UpdateShippingAddressButton({
  addressId,
}: {
  addressId: string;
}) {
  const action = async (formData: FormData) => {
    const res = await updateShippingAddress(addressId, formData);
    if (res?.validationError) {
      const errorMessage = Object.values(res.validationError)[0];
      toast.error((errorMessage as string) || 'Something went wrong');
      return;
    }
    await sleep(2000);
  };

  return (
    <SubmitButton text="Update" loadingText="Updating..." formAction={action} />
  );
}
