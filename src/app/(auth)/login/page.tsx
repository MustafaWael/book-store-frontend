import LoginForm from '@/components/forms/loginForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bookstore | Login',
  description: 'Login to your Bookstore account',
  openGraph: {
    title: 'Bookstore | Login',
    description: 'Login to your Bookstore account',
  },
};

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center gap-y-5 p-5">
      <h1 className="text-center text-3xl text-foreground">Login</h1>

      <div className="bg-card w-full max-w-md p-8 rounded-2xl flex flex-col gap-y-6">
        <LoginForm />
        <p className="text-card-foreground/75 text-center">
          Don&apos;t have an account?{' '}
          <Link className="underline" href="/signup">
            Signup
          </Link>
        </p>
      </div>
    </main>
  );
}
