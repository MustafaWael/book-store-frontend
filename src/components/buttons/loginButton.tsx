'use client';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function LoginButton() {
  let query = {};
  if (typeof window !== 'undefined') {
    query = { redirect: window.location.pathname };
  }

  return (
    <Link
      href={{
        pathname: '/login',
        query,
      }}
    >
      <Button variant="default" size="sm">
        Sign In
      </Button>
    </Link>
  );
}
