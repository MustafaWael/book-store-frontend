'use client';

import { useState } from 'react';
import SubmitButton from '../buttons/submitButton';
import { signup } from '@/actions';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type ValidationError = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

export default function SignupForm() {
  const [error, setError] = useState<ActionError>({});
  const [isTouched, setIsTouched] = useState(false);

  const router = useRouter();

  const action = async (formData: FormData) => {
    setError({});
    const res = await signup(formData);

    if (res?.validationError || res?.resError) {
      return setError(res);
    }

    router.push('/login');
  };

  return (
    <form action={action} className="flex flex-col gap-y-6">
      {error.resError?.message && (
        <p className="text-destructive text-center">{error.resError.message}</p>
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
          onChange={() => setIsTouched(true)}
        />
        {error.validationError?.name && (
          <p className="text-destructive mt-1 text-sm">
            {error.validationError.name}
          </p>
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
          onChange={() => setIsTouched(true)}
        />
        {error.validationError?.email && (
          <p className="text-destructive mt-1 text-sm">
            {error.validationError.email}
          </p>
        )}
      </div>

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
        {error.validationError?.password && (
          <p className="text-destructive mt-1 text-sm">
            {error.validationError.password}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <Label className="mb-3" htmlFor="password">
          Confirm Password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirm_password"
          placeholder="Type your password"
        />
        {error.validationError?.confirm_password && (
          <p className="text-destructive mt-1 text-sm">
            {error.validationError.confirm_password}
          </p>
        )}
      </div>

      <SubmitButton
        text="Signup"
        loadingText="Signing up..."
        disabled={!isTouched}
      />
    </form>
  );
}
