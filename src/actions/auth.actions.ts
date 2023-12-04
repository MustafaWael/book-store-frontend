'use server';

import {
  ChangePasswordDetails,
  ChangeUserDetails,
  ForgotPasswordDetails,
  LoginCredentials,
  ResetPasswordDetails,
  SignupDetails,
  filterEmptyValues,
  formDataToObject,
  mapJoiErrors,
  setCookiesFromFetchResponse,
  validateChangePasswordDetails,
  validateChangeUserDetails,
  validateCredentials,
  validateForgotPasswordDetails,
  validateResetPasswordDetails,
  validateSignupDetails,
} from '@/lib/utils';
import { cookies } from 'next/headers';
import * as authAPI from '@/lib/api/auth';

export const signup = async (formData: FormData) => {
  const form = formDataToObject<SignupDetails>(formData);
  const { error, value } = validateSignupDetails(form);

  if (error) return { validationError: mapJoiErrors(error) };

  try {
    const response = await authAPI.signup(value);
    const data = await response.json();

    if (data?.error) return { resError: { message: data.error } };

    return { user: data };
  } catch (error) {
    return { resError: { message: 'Username already exists' } };
  }
};

export const login = async (formData: FormData) => {
  const cookieStore = cookies();
  try {
    const form = formDataToObject<LoginCredentials>(formData);
    const { value, error } = validateCredentials(form);

    if (error) return { validationError: mapJoiErrors(error) };

    const response = await authAPI.login(value);
    const data = await response.json();

    if (response.ok && data?.message === 'Login successful') {
      setCookiesFromFetchResponse(response);
      cookieStore.delete('logged_out');
      return { user: data };
    }

    if (data?.error) return { resError: { message: data.error } };
    return data;
  } catch (error) {
    return { resError: { message: 'Internal server error' } };
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;

  try {
    if (!accessToken || !refreshToken) throw new Error('No tokens found');
    const res = await authAPI.logout({ accessToken, refreshToken });
    cookieStore.set('logged_out', 'true');
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    cookies().delete('access_token');
    cookies().delete('refresh_token');
  }
};

export const changePassword = async (formData: FormData) => {
  const accessToken = cookies().get('access_token')?.value;
  if (!accessToken) return { resError: { message: 'No access token found' } };

  const form = formDataToObject<ChangePasswordDetails>(formData);
  const { error, value } = validateChangePasswordDetails(form);

  if (error) return { validationError: mapJoiErrors(error) };

  const { newPassword, currentPassword } = value;

  try {
    const data = await authAPI.changePassword(
      newPassword,
      currentPassword,
      accessToken,
    );

    if (data?.error) return { resError: { message: data.error } };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const changeUserDetails = async (formData: FormData) => {
  const accessToken = cookies().get('access_token')?.value;
  if (!accessToken) return { resError: { message: 'No access token found' } };
  const form = formDataToObject<ChangeUserDetails>(formData);
  const { error, value } = validateChangeUserDetails(form);

  if (error) return { validationError: mapJoiErrors(error) };

  const filteredValue = filterEmptyValues(value);

  try {
    const data = await authAPI.changeUserDetails(filteredValue, accessToken);

    if (data?.error) return { resError: { message: data.error } };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (formData: FormData) => {
  const form = formDataToObject<ForgotPasswordDetails>(formData);
  const { error, value } = validateForgotPasswordDetails(form);

  if (error) return { validationError: mapJoiErrors(error) };

  try {
    const data = await authAPI.forgotPassword(value);

    if (data?.error) {
      return {
        resError: {
          message: data.error,
        },
      };
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (formData: FormData, token: string) => {
  const form = formDataToObject<ResetPasswordDetails>(formData);
  const { error, value } = validateResetPasswordDetails(form);

  if (error) return { validationError: mapJoiErrors(error) };

  try {
    const data = await authAPI.resetPassword(value, token);

    if (data?.error) return { resError: { message: data.error } };

    return data;
  } catch (error) {
    console.log(error);
  }
};
