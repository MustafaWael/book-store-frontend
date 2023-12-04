import Container from '@/components/container';
import ResetPasswordForm from '@/components/forms/resetPassword';

type PageProps = {
  searchParams: {
    token?: string;
  };
  params: {};
};

export default function ResetPassword({ searchParams }: PageProps) {
  const token = searchParams?.token;

  if (!token) {
    return (
      <Container asChild>
        <main className="flex flex-col items-center gap-y-5 py-5">
          <h1 className="text-center text-3xl text-foreground">Reset Password</h1>
          <div className="bg-card w-full max-w-md p-8 rounded-2xl">
            <p className="text-destructive text-center border border-destructive p-3 rounded-md">
              This page is only accessible via the link sent to your email
              address to reset your password.
            </p>
          </div>
        </main>
      </Container>
    );
  }

  return (
    <main className="flex flex-col items-center gap-y-5 p-5">
      <h1 className="text-center text-3xl text-foreground">Reset Password</h1>
      <div className="bg-card w-full max-w-md p-8 rounded-2xl">
        <ResetPasswordForm token={token} />
      </div>
    </main>
  );
}
