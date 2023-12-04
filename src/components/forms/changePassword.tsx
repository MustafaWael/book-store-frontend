'use client';

import { changePassword } from '@/actions';
import { useEffect, useRef, useState } from 'react';
import FormButton from '../buttons/submitButton';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ValidationError = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

export default function ChangePasswordForm() {
  const [error, setError] = useState<ActionError>({});
  const [success, setSuccess] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const action = async (formData: FormData) => {
    setError({});
    const res = await changePassword(formData);

    if (res?.validationError || res?.resError) {
      return setError(res);
    }

    setSuccess(true);
    setIsTouched(false);
  };

  useEffect(() => {
    if (success) {
      timeoutId.current = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [success]);

  return (
    <form action={action} className="flex flex-col gap-y-6">
      {error?.resError?.message && (
        <p className="text-red-500 text-center border border-red-700 p-3 rounded-md">
          {error?.resError?.message}
        </p>
      )}

      {success && (
        <p className="text-green-500 text-center border border-green-700 p-3 rounded-md">
          Password changed successfully
        </p>
      )}

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="currentPassword">
          Current Password
        </Label>
        <Input
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder="Type your current password"
          onChange={() => setIsTouched(true)}
        />
        {error?.validationError?.currentPassword && (
          <p className="text-red-500">
            {error?.validationError.currentPassword}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="newPassword">
          New Password
        </Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Type your new password"
          onChange={() => setIsTouched(true)}
        />
        {error?.validationError?.newPassword && (
          <p className="text-red-500">{error?.validationError.newPassword}</p>
        )}
      </div>

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="confirmPassword">
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your new password"
          onChange={() => setIsTouched(true)}
        />
        {error?.validationError?.confirmPassword && (
          <p className="text-red-500">
            {error?.validationError.confirmPassword}
          </p>
        )}
      </div>

      <FormButton
        text="Change Password"
        loadingText={`Changing Password`}
        disabled={!isTouched}
      />
    </form>
  );
}
