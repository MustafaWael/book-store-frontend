import { Button, buttonVariants } from '@/components/ui/button';
import OpenCart from './buttons/openCartButton';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './buttons/logoutButton';
import { fetchUserCart } from '@/lib/api/books';
import Container from '@/components/container';
import { SearchIcon, User2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BooksSearch from './booksSearch';
import ThemeSwitcher from './themeSwitcher';
import { cn } from '@/lib/utils';
import LoginButton from './buttons/loginButton';

export default async function Navbar() {
  const cartData = await fetchUserCart(cookies().get('access_token')?.value!);

  const cartItemsLength = cartData?.books?.length;

  const isLoggedIn = !!cookies().get('access_token')?.value;

  return (
    <nav className="sticky top-0 left-0 z-40 py-4">
      <Container className="max-w-2xl">
        <div className="bg-primary/80 backdrop-blur-md contrast-100 rounded-2xl px-3 md:px-6 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="font-kaushan text-xl xs:text-2xl md:text-3xl text-primary-foreground"
          >
            Book Store
          </Link>
          <div className="flex gap-x-3">
            <BooksSearch />

            {isLoggedIn ? <OpenCart cartItemsNumber={cartItemsLength} /> : null}

            {!isLoggedIn ? <LoginButton /> : null}

            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="outline-none border-none"
                >
                  <Button variant={'secondary'} size={'icon'}>
                    <User2Icon size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <ThemeSwitcher />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
