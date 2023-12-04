'use client';

import { useRouter } from 'next/navigation';
import SubmitButton from '../buttons/submitButton';
import { useState } from 'react';
import { login } from '@/actions';
import { createCart } from '@/lib/api/books';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useSearchParams } from 'next/navigation';

type ValidationError = {
  email: string;
  password: string;
};

type ResError = {
  message?: string;
};

type ActionError = {
  validationError?: ValidationError;
  resError?: ResError;
};

export default function LoginForm() {
  const [error, setError] = useState<ActionError>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const action = async (formData: FormData) => {
    setError({});
    const res = await login(formData);

    if (res?.validationError || res?.resError) {
      return setError(res);
    }

    if (res?.user) {
      createCart(res.user.accessToken);
      router.refresh();
      router.replace(searchParams.get('redirect') || '/');
    }
  };

  return (
    <form action={action} className="flex flex-col gap-y-6">
      {error.resError?.message && (
        <p className="text-red-500 text-center">{error.resError.message}</p>
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
        />
        {error.validationError?.email && (
          <p className="text-red-500 mt-1 text-sm">
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
        />
        {error.validationError?.password && (
          <p className="text-red-500 mt-1 text-sm">
            {error.validationError.password}
          </p>
        )}
      </div>

      <SubmitButton text="Login" loadingText="Logging in..." />
    </form>
  );
}
