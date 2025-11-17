/**
 * Gas Station Validation Schemas
 * Zod schemas for validating all station-related inputs
 */

import { z } from 'zod';
import { StationType, FuelType, StationStatus } from './types';

/**
 * Latitude validation: -90 to 90
 * Venezuela is roughly 0° to 12° N
 */
const latitudeSchema = z
  .number()
  .min(-90, 'Latitude must be between -90 and 90')
  .max(90, 'Latitude must be between -90 and 90')
  .refine((lat) => lat >= 0 && lat <= 13, {
    message: 'Latitude must be within Venezuela (0° to 13° N)',
  });

/**
 * Longitude validation: -180 to 180
 * Venezuela is roughly -73° to -59° W
 */
const longitudeSchema = z
  .number()
  .min(-180, 'Longitude must be between -180 and 180')
  .max(180, 'Longitude must be between -180 and 180')
  .refine((lon) => lon >= -74 && lon <= -59, {
    message: 'Longitude must be within Venezuela (-74° to -59° W)',
  });

/**
 * Station Type enum validation
 */
const stationTypeSchema = z.nativeEnum(StationType, {
  errorMap: () => ({ message: 'Invalid station type. Must be PDVSA, PRIVATE, or MIXED' }),
});

/**
 * Fuel Type enum validation
 */
const fuelTypeSchema = z.nativeEnum(FuelType, {
  errorMap: () => ({
    message: 'Invalid fuel type. Must be GASOLINA_95, GASOLINA_91, DIESEL, or GAS',
  }),
});

/**
 * Station Status enum validation
 */
const stationStatusSchema = z.nativeEnum(StationStatus, {
  errorMap: () => ({
    message: 'Invalid station status. Must be OPEN, CLOSED, QUEUE, NO_FUEL, or UNKNOWN',
  }),
});

/**
 * Create Station Schema
 */
export const createStationSchema = z.object({
  name: z
    .string()
    .min(3, 'Station name must be at least 3 characters')
    .max(100, 'Station name must not exceed 100 characters')
    .trim(),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(255, 'Address must not exceed 255 characters')
    .trim(),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  stationType: stationTypeSchema,
  fuelTypes: z
    .array(fuelTypeSchema)
    .min(1, 'At least one fuel type is required')
    .max(4, 'Maximum 4 fuel types allowed'),
  hasConvenience: z.boolean().optional().default(false),
  hasCarWash: z.boolean().optional().default(false),
  hasAirPump: z.boolean().optional().default(false),
});

/**
 * Update Station Schema (all fields optional)
 */
export const updateStationSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Station name must be at least 3 characters')
      .max(100, 'Station name must not exceed 100 characters')
      .trim()
      .optional(),
    address: z
      .string()
      .min(10, 'Address must be at least 10 characters')
      .max(255, 'Address must not exceed 255 characters')
      .trim()
      .optional(),
    latitude: latitudeSchema.optional(),
    longitude: longitudeSchema.optional(),
    stationType: stationTypeSchema.optional(),
    fuelTypes: z
      .array(fuelTypeSchema)
      .min(1, 'At least one fuel type is required')
      .max(4, 'Maximum 4 fuel types allowed')
      .optional(),
    hasConvenience: z.boolean().optional(),
    hasCarWash: z.boolean().optional(),
    hasAirPump: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  });

/**
 * Nearby Stations Query Schema
 */
export const nearbyStationsSchema = z.object({
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  radiusKm: z
    .number()
    .min(0.5, 'Radius must be at least 0.5km')
    .max(50, 'Radius must not exceed 50km')
    .optional()
    .default(5),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must not exceed 100')
    .optional()
    .default(20),
  status: stationStatusSchema.optional(),
  fuelType: fuelTypeSchema.optional(),
});

/**
 * Search Stations Schema
 */
export const searchStationsSchema = z.object({
  query: z
    .string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must not exceed 100 characters')
    .trim(),
  latitude: latitudeSchema.optional(),
  longitude: longitudeSchema.optional(),
  limit: z
    .number()
    .int()
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit must not exceed 100')
    .optional()
    .default(20),
});

/**
 * Station ID Parameter Schema (for route params)
 */
export const stationIdSchema = z.object({
  id: z.string().uuid('Invalid station ID format'),
});

// Type inference from schemas
export type CreateStationInput = z.infer<typeof createStationSchema>;
export type UpdateStationInput = z.infer<typeof updateStationSchema>;
export type NearbyStationsInput = z.infer<typeof nearbyStationsSchema>;
export type SearchStationsInput = z.infer<typeof searchStationsSchema>;
export type StationIdInput = z.infer<typeof stationIdSchema>;
