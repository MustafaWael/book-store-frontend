export default function paymentSuccess() {
  return (
    <main className="flex flex-col items-center gap-y-5 container py-5">
      <h1 className="text-center text-3xl text-white">Payment Success</h1>
      <div className="bg-card w-full max-w-md p-8 rounded-2xl flex flex-col gap-y-6">
        <p className="text-green-500 text-center">
          Payment successful! Redirecting to home page...
        </p>
      </div>
    </main>
  );
}
