import ShippingAddressForm from '@/components/forms/shippingAddress/shippingAddress';
import CreateAddressModal from '@/components/modals/createAddressModal';

export default function CreateAddress() {
  return ( 
    <CreateAddressModal>
      <ShippingAddressForm actionType="create" />
    </CreateAddressModal>
  );
}
