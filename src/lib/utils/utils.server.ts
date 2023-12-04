'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CookieMap } from 'set-cookie-parser';

export const setCookies = (
  cookiesObject: CookieMap,
  middlewareResObject?: NextResponse,
) => {
  const setFunction = middlewareResObject
    ? middlewareResObject.cookies
    : cookies();

  for (const { sameSite, domain, ...cookie } of Object.values(cookiesObject)) {
    setFunction.set(cookie.name, cookie.value, {
      ...cookie,
      sameSite: !sameSite ? false : (sameSite as 'strict' | 'lax' | 'none'),
      secure: false,
    });
  }
};
