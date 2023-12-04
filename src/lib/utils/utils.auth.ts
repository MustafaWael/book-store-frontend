import { NextRequest, NextResponse } from 'next/server';
import { generateAccressToken } from '../api/auth';
import { setCookiesToMiddlewareResponse } from './utils.cookies';

export const shouldRedirect = (request: NextRequest) =>
  request.nextUrl.pathname.startsWith('/login') ||
  request.nextUrl.pathname.startsWith('/signup');

export const redirectIfLoggedIn = (request: NextRequest) => {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (accessToken && refreshToken && shouldRedirect(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return null;
};

export const redirectIfNotLoggedIn = (request: NextRequest) => {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return null;
};

export const refreshTokenAndRedirect = async (request: NextRequest) => {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (!accessToken && refreshToken) {
    const res = await generateAccressToken(refreshToken.value);

    if (res.ok) {
      console.log('generating new access token');
      const response = shouldRedirect(request)
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.redirect(request.url);

      setCookiesToMiddlewareResponse(res, response);
      return response;
    }
  }
  return null;
};
