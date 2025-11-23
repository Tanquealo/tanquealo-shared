/**
 * Auth Validation Schemas
 * Zod schemas for validating authentication requests
 */

import { z } from 'zod';

// Validate Venezuelan phone numbers (+58)
const venezuelanPhoneRegex = /^\+58(412|414|424|416|426)\d{7}$/;

export const registerSchema = z.object({
  phone_number: z
    .string()
    .regex(venezuelanPhoneRegex, 'Phone number must be a valid Venezuelan number (e.g., +584121234567)'),
  username: z.string().min(3).max(50).optional(),
});

export const verifyCodeSchema = z.object({
  phone_number: z.string().regex(venezuelanPhoneRegex),
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Verification code must contain only numbers'),
});

export const loginSchema = z.object({
  phone_number: z.string().regex(venezuelanPhoneRegex),
  code: z.string().length(6).regex(/^\d+$/),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, 'Refresh token is required'),
});

// Export types inferred from schemas
export type RegisterInput = z.infer<typeof registerSchema>;
export type VerifyCodeInput = z.infer<typeof verifyCodeSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
