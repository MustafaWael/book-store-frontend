import Link from 'next/link';
import SignupForm from '@/components/forms/signupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookstore | Signup',
  description: 'Signup for a Bookstore account',
  openGraph: {
    title: 'Bookstore | Signup',
    description: 'Signup for a Bookstore account',
  },
};

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center gap-y-5 p-5">
      <h1 className="text-center text-3xl text-foreground">Signup</h1>
      <div className="bg-card w-full max-w-md p-8 rounded-2xl flex flex-col gap-y-6">
        <SignupForm />
        <p className="text-card-foreground/75 text-center">
          Already have an account?{' '}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
