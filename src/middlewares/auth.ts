import { redirectIfLoggedIn, refreshTokenAndRedirect } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function authMiddleware(request: NextRequest) {
  try {
    return (
      redirectIfLoggedIn(request) ||
      (await refreshTokenAndRedirect(request)) ||
      NextResponse.next()
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
