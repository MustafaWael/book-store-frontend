import { BASE_URLS } from '@/constants';
import {
  ChangeUserDetails,
  ForgotPasswordDetails,
  LoginCredentials,
  ResetPasswordDetails,
  SignupDetails,
} from '../utils/validators';

export const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASE_URLS.authentication}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(credentials),
  });

  return response;
};

export const signup = async (details: SignupDetails) => {
  const response = await fetch(`${BASE_URLS.authentication}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(details),
  });

  return response;
};

export const logout = async ({
  refreshToken,
  accessToken,
}: {
  refreshToken: string;
  accessToken: string;
}) => {
  const res = await fetch(`${BASE_URLS.authentication}/users/logout`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      authorization: `Bearer ${accessToken}`,
      Cookie: `refresh_token=${refreshToken}; access_token=${accessToken}`,
    },
  });

  return res;
};

export const getUser = async (accessToken: string) => {
  try {
    const res = await fetch(`${BASE_URLS.authentication}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (
  newPassword: string,
  oldPassword: string,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.authentication}/users/password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
    // credentials: "include",
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  const data = await res.json();
  return data;
};

export const changeUserDetails = async (
  details: ChangeUserDetails,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.authentication}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
    // credentials: "include",
    body: JSON.stringify(details),
  });

  const data = await res.json();
  return data;
};

export const forgotPassword = async (details: ForgotPasswordDetails) => {
  const res = await fetch(`${BASE_URLS.authentication}/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    // credentials: "include",
    body: JSON.stringify(details),
  });

  const data = await res.json();

  return data;
};

export const resetPassword = async (
  details: ResetPasswordDetails,
  accessToken: string,
) => {
  const res = await fetch(`${BASE_URLS.authentication}/users/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      password: details.password,
      accessToken,
    }),
  });

  const data = await res.json();
  return data;
};

export const generateAccressToken = async (refreshToken: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Cookie', `refresh_token=${refreshToken}`);

  return await fetch(`${BASE_URLS.authentication}/users/refresh-token`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-cache',
    headers,
  });
};
