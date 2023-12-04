import { isProtectedRoute } from '@/lib/utils/utils';
import { NextRequest } from 'next/server';

export function isProtectedRouteMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  try {
    const refreshToken = request.cookies.get('refresh_token');

    // if no refresh token and route is protected, redirect to login
    if (!refreshToken && isProtectedRoute(pathname)) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
