import Joi from 'joi';
import validator from 'validator';

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(7).required(),
});

export type LoginCredentials = {
  email: string;
  password: string;
};

export const validateCredentials = (credentials: LoginCredentials) => {
  return loginSchema.validate(credentials, {
    abortEarly: false,
  });
};

const signupSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
  role: Joi.string().valid('customer', 'admin').optional().default('customer'),
});

export type SignupDetails = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role?: 'customer' | 'admin';
};

export const validateSignupDetails = (details: SignupDetails) => {
  return signupSchema.validate(details, {
    abortEarly: false,
  });
};

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().min(7).required(),
  newPassword: Joi.string().min(7).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
}).options({ stripUnknown: true });

export type ChangePasswordDetails = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const validateChangePasswordDetails = (
  details: ChangePasswordDetails,
) => {
  return changePasswordSchema.validate(details, {
    abortEarly: false,
  });
};

export const changeUserDetailsSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).allow('').optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow('')
    .optional(),
}).options({ stripUnknown: true });

export type ChangeUserDetails = {
  name?: string;
  email?: string;
};

export const validateChangeUserDetails = (details: ChangeUserDetails) => {
  return changeUserDetailsSchema.validate(details, {
    abortEarly: false,
  });
};

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export type ForgotPasswordDetails = {
  email: string;
};

export const validateForgotPasswordDetails = (
  details: ForgotPasswordDetails,
) => {
  return forgotPasswordSchema.validate(details, {
    abortEarly: false,
  });
};

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(7).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
});

export type ResetPasswordDetails = {
  password: string;
  confirmPassword: string;
};

export const validateResetPasswordDetails = (details: ResetPasswordDetails) => {
  return resetPasswordSchema.validate(details, {
    abortEarly: false,
  });
};

const shippingAddressSchema = Joi.object({
  fullName: Joi.string().required(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().custom((value, helpers) => {
    if (!validator.isPostalCode(value, 'any')) {
      return helpers.message({ custom: 'Invalid postal code' });
    }
    return value;
  }),
  country: Joi.string().required(),
  phoneNumber: Joi.string().custom((value, helpers) => {
    if (!validator.isMobilePhone(value, "ar-EG")) {
      return helpers.message({ custom: 'Invalid phone number' });
    }
    return value;
  })
}).options({ stripUnknown: true });

export type ShippingAddress = {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
};

export const validateShippingAddress = (details: ShippingAddress) => {
  return shippingAddressSchema.validate(details, {
    abortEarly: false,
  });
};
