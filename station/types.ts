/**
 * Gas Station Module - Type Definitions
 * Handles gas station data, geospatial queries, and status tracking
 */

// ============================================================================
// Payment Methods
// ============================================================================

export enum PaymentMethod {
  CASH_BS = 'CASH_BS',         // Efectivo Bolívares
  CASH_USD = 'CASH_USD',       // Efectivo Dólares
  POS = 'POS',                 // Point of Sale (Tarjeta)
  DIGITAL_BS = 'DIGITAL_BS',   // Pago móvil / Transferencia
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH_BS]: 'Efectivo (Bs)',
  [PaymentMethod.CASH_USD]: 'Efectivo (USD)',
  [PaymentMethod.POS]: 'Punto de Venta',
  [PaymentMethod.DIGITAL_BS]: 'Pago Digital (Bs)',
};

// ============================================================================
// Station Types
// ============================================================================

export interface GasStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  geohash: string; // For efficient proximity queries
  stationType: StationType;
  fuelTypes: FuelType[];
  
  // Payment and ratings
  paymentMethods: PaymentMethod[];
  averageRating: number; // 0.00 - 5.00
  totalRatings: number;  // Count of ratings
  
  // Amenities
  hasConvenience: boolean;
  hasCarWash: boolean;
  hasAirPump: boolean;
  
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // User ID who added this station
  isVerified: boolean; // Admin-verified station
}

export enum StationType {
  SUBSIDIZED = 'SUBSIDIZED',   // Subsidiadas (PDVSA state-subsidized)
  DOLLARIZED = 'DOLLARIZED',   // Dolarizadas (market-rate/USD pricing)
}

export enum FuelType {
  GASOLINE = 'GASOLINE',   // Gasolina
  GASOIL = 'GASOIL',       // Gasoil
  GAS = 'GAS',             // Gas (LPG/GNV)
}

export enum StationStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  REFILLING = 'REFILLING',   // Fuel truck is unloading (está descargando)
  QUEUE = 'QUEUE',           // Open but has queue
  NO_FUEL = 'NO_FUEL',       // Open but no fuel
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
  paymentMethods?: PaymentMethod[]; // Default: [CASH_BS]
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
  paymentMethods?: PaymentMethod[];
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
  paymentMethod?: PaymentMethod; // Filter by payment method
  minRating?: number; // Filter by minimum rating (0-5)
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
