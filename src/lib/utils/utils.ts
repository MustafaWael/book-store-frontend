import { PROTECTED_ROUTES } from '@/constants';
import { Comment, User } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import Joi from 'joi';
import { twMerge } from 'tailwind-merge';
import { getUser } from '../api/auth';

/**
 * Combines multiple class names into a single string.
 * @param inputs - The class names to combine.
 * @returns A string containing all the class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Debounces a function call, delaying its execution until after a certain amount of time has passed.
 * @param func - The function to be debounced.
 * @param wait - The amount of time to wait before executing the debounced function.
 * @returns A function that, when called, will execute the debounced function after the specified wait time has passed.
 */
export const debounce = (func: Function, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Delays the execution of a function for a specified amount of time.
 * @param ms - The amount of time to delay the execution in milliseconds.
 * @returns A promise that resolves after the specified amount of time has elapsed.
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Checks if the given pathname is a protected route.
 * @param pathname - The pathname to check.
 * @returns True if the pathname is a protected route, false otherwise.
 */
export const isProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

/**
 * Checks if the given index is the last index in the array.
 * @param data - The array to check.
 * @param index - The index to check.
 * @returns True if the index is the last index in the array, false otherwise.
 */
export const isLastItem = (data: any[], index: number) =>
  data.length - 1 === index;

/**
 * Converts a Joi validation error object into a more readable error object.
 * @param joiError - The Joi validation error object to convert.
 * @returns An object containing the error messages, with the keys being the field names and the values being the error messages.
 */
export const mapJoiErrors = (joiError: Joi.ValidationError) => {
  const errorMap = new Map();
  joiError.details.forEach((err) => {
    errorMap.set(err.path[0], err.message);
  });
  return Object.fromEntries(errorMap.entries());
};

/**
 * Converts a FormData object to a plain object.
 * @param formData - The FormData object to convert.
 * @returns A plain object with key-value pairs from the FormData object.
 */
export function formDataToObject<T>(formData: FormData): T {
  // const entries = formData.entries();
  // const result: any = {};
  // for (const [key, value] of entries) {
  //   result[key] = value;
  // }
  // return result as T;

  return Object.fromEntries(formData.entries()) as T;
}

/**
 * Formats a given price as a currency string in USD.
 * @param price - The price to format.
 * @returns The formatted price as a string.
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Converts a given string to a slug.
 * @param str - The string to convert.
 * @returns The slugified string.
 */
export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

/**
 * Converts a given slug to a title.
 * @param slug - The slug to convert.
 * @returns The title.
 */
export const deslugify = (slug: string) => {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Filters out any key-value pairs in an object where the value is null or undefined.
 * @param obj - The object to filter.
 * @returns A new object with only the key-value pairs where the value is not null or undefined.
 */
export const filterEmptyValues = (obj: any) => {
  const filteredObj = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null),
  );
  return filteredObj;
};

/**
 * Formats a phone number string by removing all spaces, dashes, parentheses, and returning the result as a number.
 * @param phoneNumberString - The phone number string to format.
 * @returns The formatted phone number as a number, or null if the input is falsy.
 */
export const formatPhoneNumber = (phoneNumberString: string) => {
  const digitsOnly = phoneNumberString.replace(/\D/g, '');
  return parseInt(digitsOnly);

  // parseInt(
  //   address
  //     ?.phoneNumber!?.replaceAll(' ', '')
  //     .replaceAll('-', '')
  //     .replaceAll('(', '')
  //     .replaceAll(')', ''),
  // )
};
