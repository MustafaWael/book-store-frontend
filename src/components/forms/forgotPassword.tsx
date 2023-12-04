'use client';

import { forgotPassword } from '@/actions';
import { useState } from 'react';
import SubmitButton from '../buttons/submitButton';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ValidationError = {
  email: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

export default function ForgotPasswordForm() {
  const [error, setError] = useState<ActionError>({});
  const [success, setSuccess] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const action = async (formData: FormData) => {
    setError({});
    const res = await forgotPassword(formData);

    if (res?.validationError || res?.resError) {
      return setError(res);
    }

    setSuccess(true);
    setIsTouched(false);
  };

  return (
    <form action={action} className="flex flex-col gap-y-6">
      {error?.resError?.message && (
        <p className="text-red-500 text-center border border-red-700 p-3 rounded-md">
          {error?.resError?.message}
        </p>
      )}

      {success && (
        <p className="text-green-500 text-center border border-green-700 p-3 rounded-md">
          An email has been sent to your email address. Please follow the
          instructions in the email to reset your password.
        </p>
      )}

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Type your email"
          onChange={() => setIsTouched(true)}
        />

        {error?.validationError?.email && (
          <p className="text-red-500">{error?.validationError?.email}</p>
        )}
      </div>

      <div className="flex justify-center">
        <SubmitButton
          text="Send Email"
          loadingText="Sending Email"
          disabled={!isTouched}
        />
      </div>
    </form>
  );
}
