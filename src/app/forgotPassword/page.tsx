'use client';
import Container from '@/components/container';
import ForgotPasswordForm from '@/components/forms/forgotPassword';

export default function ForgotPassword() {
  return (
    <Container asChild>
      <main className="flex flex-col items-center gap-y-5 py-5">
        <h1 className="text-center text-3xl text-foreground">Forgot Password</h1>
        <div className="bg-card w-full max-w-md p-8 rounded-2xl">
          <ForgotPasswordForm />
        </div>
      </main>
    </Container>
  );
}
