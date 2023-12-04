'use client';

import { changeUserDetails } from '@/actions';
import { useEffect, useRef, useState } from 'react';
import FormButton from '../buttons/submitButton';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ProfileSettingsFormProps = {
  name: string;
  email: string;
};

type ValidationError = {
  name?: string;
  email?: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

export default function ProfileSettingsForm({
  name,
  email,
}: ProfileSettingsFormProps) {
  const [error, setError] = useState<ActionError>({});
  const [success, setSuccess] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const action = async (formData: FormData) => {
    setError({});
    const res = await changeUserDetails(formData);

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
          User details updated successfully
        </p>
      )}

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="username">
          Username
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Type your name"
          defaultValue={name}
          onChange={() => setIsTouched(true)}
        />

        {error?.validationError?.name && (
          <p className="text-red-500">{error?.validationError.name}</p>
        )}
      </div>

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Type your email"
          defaultValue={email}
          onChange={() => setIsTouched(true)}
        />

        {error?.validationError?.email && (
          <p className="text-red-500">{error?.validationError.email}</p>
        )}
      </div>

      <FormButton
        text="Update"
        loadingText="Updating..."
        disabled={!isTouched}
      />
    </form>
  );
}
