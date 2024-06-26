import './globals.css';
import type { Metadata } from 'next';
import { Inter, Kaushan_Script, Neuton } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ShoppingCart from '@/components/shoppingCart';
import JotaiProvider from '@/components/providers/jotai';
import { Toaster } from 'react-hot-toast';
import CreateAddressModal from '@/components/modals/createAddressModal';
import ShippingAddressForm from '@/components/forms/shippingAddress/shippingAddress';
import ReactQueryProvider from '@/components/providers/reactQuery';
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const kaushan = Kaushan_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-kaushan',
});

const neuton = Neuton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-neuton',
});

const url = new URL(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://book-store-frontend-sable.vercel.app',
);

export const metadata: Metadata = {
  metadataBase: url,
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${kaushan.variable} ${neuton.variable} bg-background text-foreground h-full remove-scrollbar`}
      >
        <JotaiProvider>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <NextTopLoader
                color="hsl(var(--foreground))"
                showSpinner={false}
              />
              <CreateAddressModal>
                <ShippingAddressForm actionType="create" />
              </CreateAddressModal>
              <ShoppingCart />
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </ReactQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
