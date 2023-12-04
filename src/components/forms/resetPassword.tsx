'use client';

import { useState } from 'react';
import SubmitButton from '../buttons/submitButton';
import { resetPassword } from '@/actions';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ValidationError = {
  password: string;
  confirmPassword: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [error, setError] = useState<ActionError>({});
  const [success, setSuccess] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const action = async (formData: FormData) => {
    setError({});
    const res = await resetPassword(formData, token);

    if (res?.validationError || res?.resError) {
      return setError(res);
    }

    setSuccess(true);
    setIsTouched(false);
  };
  return (
    <form action={action} className="flex flex-col gap-y-6">
      {error?.resError?.message && (
        <p className="text-destructive text-center border border-destructive p-3 rounded-md">
          {error?.resError?.message}
        </p>
      )}

      {success && (
        <p className="text-green-500 text-center border border-green-700 p-3 rounded-md">
          Your password has been reset. You can now{' '}
          <Link href="/login" className="text-blue-500">
            login
          </Link>{' '}
          with your new password.
        </p>
      )}

      {/* password and confirm password fields */}
      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="password">
          Password
        </Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Type your password"
          onChange={() => setIsTouched(true)}
        />
        {error?.validationError?.password && (
          <p className="text-destructive">{error?.validationError?.password}</p>
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
          placeholder="Type your password again"
          onChange={() => setIsTouched(true)}
        />
        {error?.validationError?.confirmPassword && (
          <p className="text-destructive">
            {error?.validationError?.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <SubmitButton
          text="Reset Password"
          loadingText="Resetting Password"
          disabled={!isTouched}
        />
      </div>
    </form>
  );
}
