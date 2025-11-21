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
  [PaymentMethod.DIGITAL_BS]: 'Pago Movil (Bs)',
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
  type: StationType;             // SUBSIDIZED | DOLLARIZED
  fuel_types: FuelType[];
  
  // Payment and ratings
  payment_methods: PaymentMethod[];
  average_rating: number; // 0.00 - 5.00
  total_ratings: number;  // Count of ratings
  
  created_at: Date;
  updated_at: Date;
  created_by: string; // User ID who added this station
  is_verified: boolean; // Admin-verified station
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
  station_id: string;
  status: StationStatus;
  available_fuels: FuelType[];
  queue_length: QueueLength;
  last_updated: Date;
  report_count: number; // Number of reports in consensus
  confidence_score: number; // 0-100, based on reports and reporter trust
  average_reporter_trust: number;
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
  type: StationType;
  fuel_types: FuelType[];
  payment_methods?: PaymentMethod[]; // Default: [CASH_USD]
}

export interface UpdateStationRequest {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  type?: StationType;
  fuel_types?: FuelType[];
  payment_methods?: PaymentMethod[];
}

export interface NearbyStationsRequest {
  latitude: number;
  longitude: number;
  radius_km?: number; // Default 5km
  limit?: number; // Default 20
  status?: StationStatus; // Filter by status
  fuel_type?: FuelType; // Filter by fuel availability
  payment_method?: PaymentMethod; // Filter by payment method
  min_rating?: number; // Filter by minimum rating (0-5)
}

export interface StationWithDistance extends GasStation {
  distance_km: number;
  current_status?: StationCurrentStatus;
}

export interface SearchStationsRequest {
  query: string; // Search by name or address
  latitude?: number;
  longitude?: number;
  limit?: number;
}
