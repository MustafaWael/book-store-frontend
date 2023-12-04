'use client';

import { logout } from '@/actions';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useTransition } from 'react';
import { Loader2Icon } from 'lucide-react';
import { isProtectedRoute } from '@/lib/utils';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      await logout();
      if (isProtectedRoute(window.location.pathname)) {
        router.replace('/');
      }
    });
  };

  return (
    <Button onClick={handleLogout} variant={'destructive'} className="w-full">
      {isPending ? (
        <Loader2Icon className="animate-spin" size={24} />
      ) : (
        'Logout'
      )}
    </Button>
  );
}
