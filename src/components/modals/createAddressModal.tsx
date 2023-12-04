'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '../ui/button';
import { useAtom, useSetAtom } from 'jotai';
import { openCreateAddressModalAtom } from '@/atoms';

export default function CreateAddressModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useAtom(openCreateAddressModalAtom);

  return (
    <Dialog defaultOpen open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Shipping Address</DialogTitle>
          <DialogDescription>
            This address will be saved to your account and can be used for your
            next order.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

type OpenCreateAddressModalProps = {} & ButtonProps &
  React.HTMLAttributes<HTMLButtonElement>;

export const OpenCreateAddressModal = ({
  children,
  ...props
}: OpenCreateAddressModalProps) => {
  const setOpen = useSetAtom(openCreateAddressModalAtom);
  return (
    <Button onClick={() => setOpen(true)} {...props}>
      {children || 'Create New Address'}
    </Button>
  );
};
