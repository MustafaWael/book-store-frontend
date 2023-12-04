import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/auth';
import { isProtectedRouteMiddleware } from './middlewares/protectedRoute';

export default async function Middleware(request: NextRequest) {
  try {
    if (isProtectedRouteMiddleware(request)) {
      return NextResponse.rewrite(new URL('/login', request.url));
    }

    return await authMiddleware(request);
  } catch (error) {
    console.log(error);
  }
}
