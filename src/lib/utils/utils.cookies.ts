import setCookieParser from 'set-cookie-parser';
import { setCookies } from './utils.server';
import { NextResponse } from 'next/server';

/**
 * Parses a combined cookie header string into an object of key-value pairs.
 * @param combinedCookieHeader - The combined cookie header string to parse.
 * @returns An object of key-value pairs representing the parsed cookies.
 */
export const parseCookieHeaders = (combinedCookieHeader: string) => {
  const splitCookieHeaders =
    setCookieParser.splitCookiesString(combinedCookieHeader);

  return setCookieParser.parse(splitCookieHeaders, {
    map: true,
  });
};

/**
 * Returns the value of the 'Set-Cookie' header from a Response object as a string.
 * @param response - The Response object to extract the cookie string from.
 * @returns The value of the 'Set-Cookie' header as a string.
 */
export const getCookieStringFromResponse = (response: Response) =>
  response.headers.get('Set-Cookie') as string;

/**
 * Sets cookies from a fetch response.
 * @param response - The fetch response object.
 * @returns The parsed cookies.
 */
export const setCookiesFromFetchResponse = (response: Response) => {
  const cookieString = getCookieStringFromResponse(response);
  return setCookies(parseCookieHeaders(cookieString));
};

export const setCookiesToMiddlewareResponse = (
  response: Response,
  middlewareResObject: NextResponse,
) => {
  const cookieString = getCookieStringFromResponse(response);
  return setCookies(parseCookieHeaders(cookieString), middlewareResObject);
};
