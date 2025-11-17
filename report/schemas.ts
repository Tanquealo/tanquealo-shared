/**
 * Report Validation Schemas
 * Zod schemas for validating report requests
 */

import { z } from 'zod';
import { ReportType, ReportStatus, InteractionType } from './types';

/**
 * Create Report Schema
 */
export const createReportSchema = z.object({
  stationId: z.string().uuid('Invalid station ID'),
  reportType: z.nativeEnum(ReportType),
  stationStatus: z.string().optional(),
  availableFuels: z.array(z.string()).optional(),
  queueLength: z
    .number()
    .int()
    .min(0, 'Queue length must be positive')
    .max(500, 'Queue length seems unrealistic')
    .optional(),
  estimatedWaitMinutes: z
    .number()
    .int()
    .min(0)
    .max(480, 'Wait time must be less than 8 hours')
    .optional(),
  latitude: z
    .number()
    .min(-90)
    .max(90)
    .refine((lat) => lat >= 0 && lat <= 13, {
      message: 'Latitude must be within Venezuela (0° to 13° N)',
    }),
  longitude: z
    .number()
    .min(-180)
    .max(180)
    .refine((lon) => lon >= -74 && lon <= -59, {
      message: 'Longitude must be within Venezuela (-74° to -59° W)',
    }),
  accuracy: z.number().min(0).max(1000).optional(), // GPS accuracy in meters
  photoUrls: z.array(z.string().url()).max(5, 'Maximum 5 photos allowed').optional(),
});

/**
 * Interact with Report Schema
 */
export const interactWithReportSchema = z.object({
  interactionType: z.nativeEnum(InteractionType),
});

/**
 * Get Reports Query Schema
 */
export const getReportsSchema = z.object({
  stationId: z.string().uuid().optional(),
  reporterId: z.string().uuid().optional(),
  status: z.nativeEnum(ReportStatus).optional(),
  reportType: z.nativeEnum(ReportType).optional(),
  limit: z
    .number()
    .int()
    .min(1)
    .max(100)
    .optional()
    .default(20),
  offset: z
    .number()
    .int()
    .min(0)
    .optional()
    .default(0),
});

// Type inference from schemas
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type InteractWithReportInput = z.infer<typeof interactWithReportSchema>;
export type GetReportsInput = z.infer<typeof getReportsSchema>;
