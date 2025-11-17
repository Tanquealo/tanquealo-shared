/**
 * User Validation Schemas
 * Zod schemas for validating user-related requests
 */

import { z } from 'zod';

/**
 * Update Profile Schema
 */
export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
    .optional(),
  avatar: z.string().url('Avatar must be a valid URL').optional(),
});

/**
 * Get Leaderboard Query Schema
 */
export const getLeaderboardSchema = z.object({
  period: z.enum(['week', 'month', 'all-time']).default('month'),
  metric: z.enum(['trust-score', 'reports', 'helpful']).default('trust-score'),
  limit: z
    .number()
    .int()
    .min(10)
    .max(100)
    .optional()
    .default(50),
});

// Type inference from schemas
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type GetLeaderboardInput = z.infer<typeof getLeaderboardSchema>;
