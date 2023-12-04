import { updateShippingAddress } from '@/actions';
import SubmitButton from '@/components/buttons/submitButton';

export default function UpdateShippingAddressButton({
  addressId,
}: {
  addressId: string;
}) {
  const action = updateShippingAddress.bind(null, addressId);
  return (
    <SubmitButton text="Update" loadingText="Updating..." formAction={action} />
  );
}
