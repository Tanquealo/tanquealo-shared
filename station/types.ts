/**
 * Gas Station Module - Type Definitions
 * Handles gas station data, geospatial queries, and status tracking
 */

export interface GasStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  geohash: string; // For efficient proximity queries
  stationType: StationType;
  fuelTypes: FuelType[];
  hasConvenience: boolean;
  hasCarWash: boolean;
  hasAirPump: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID who added this station
  isVerified: boolean; // Admin-verified station
}

export enum StationType {
  PDVSA = 'PDVSA', // State-owned
  PRIVATE = 'PRIVATE', // Private companies
  MIXED = 'MIXED', // Mixed
}

export enum FuelType {
  GASOLINA_95 = 'GASOLINA_95',
  GASOLINA_91 = 'GASOLINA_91',
  DIESEL = 'DIESEL',
  GAS = 'GAS', // GLP
}

export enum StationStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  QUEUE = 'QUEUE', // Open but has queue
  NO_FUEL = 'NO_FUEL', // Open but no fuel
  UNKNOWN = 'UNKNOWN',
}

export interface StationCurrentStatus {
  stationId: string;
  status: StationStatus;
  availableFuels: FuelType[];
  queueLength: QueueLength;
  lastUpdated: Date;
  reportCount: number; // Number of reports in consensus
  confidenceScore: number; // 0-100, based on reports and reporter trust
  averageReporterTrust: number;
}

export enum QueueLength {
  NONE = 'NONE',
  SHORT = 'SHORT', // < 10 cars
  MEDIUM = 'MEDIUM', // 10-30 cars
  LONG = 'LONG', // 30-100 cars
  VERY_LONG = 'VERY_LONG', // 100+ cars
}

export interface CreateStationRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  stationType: StationType;
  fuelTypes: FuelType[];
  hasConvenience?: boolean;
  hasCarWash?: boolean;
  hasAirPump?: boolean;
}

export interface UpdateStationRequest {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  stationType?: StationType;
  fuelTypes?: FuelType[];
  hasConvenience?: boolean;
  hasCarWash?: boolean;
  hasAirPump?: boolean;
}

export interface NearbyStationsRequest {
  latitude: number;
  longitude: number;
  radiusKm?: number; // Default 5km
  limit?: number; // Default 20
  status?: StationStatus; // Filter by status
  fuelType?: FuelType; // Filter by fuel availability
}

export interface StationWithDistance extends GasStation {
  distanceKm: number;
  currentStatus?: StationCurrentStatus;
}

export interface SearchStationsRequest {
  query: string; // Search by name or address
  latitude?: number;
  longitude?: number;
  limit?: number;
}
