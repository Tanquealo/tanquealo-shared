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
    geohash: string;
    stationType: StationType;
    fuelTypes: FuelType[];
    hasConvenience: boolean;
    hasCarWash: boolean;
    hasAirPump: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    isVerified: boolean;
}
export declare enum StationType {
    PDVSA = "PDVSA",// State-owned
    PRIVATE = "PRIVATE",// Private companies
    MIXED = "MIXED"
}
export declare enum FuelType {
    GASOLINA_95 = "GASOLINA_95",
    GASOLINA_91 = "GASOLINA_91",
    DIESEL = "DIESEL",
    GAS = "GAS"
}
export declare enum StationStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    QUEUE = "QUEUE",// Open but has queue
    NO_FUEL = "NO_FUEL",// Open but no fuel
    UNKNOWN = "UNKNOWN"
}
export interface StationCurrentStatus {
    stationId: string;
    status: StationStatus;
    availableFuels: FuelType[];
    queueLength: QueueLength;
    lastUpdated: Date;
    reportCount: number;
    confidenceScore: number;
    averageReporterTrust: number;
}
export declare enum QueueLength {
    NONE = "NONE",
    SHORT = "SHORT",// < 10 cars
    MEDIUM = "MEDIUM",// 10-30 cars
    LONG = "LONG",// 30-100 cars
    VERY_LONG = "VERY_LONG"
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
    radiusKm?: number;
    limit?: number;
    status?: StationStatus;
    fuelType?: FuelType;
}
export interface StationWithDistance extends GasStation {
    distanceKm: number;
    currentStatus?: StationCurrentStatus;
}
export interface SearchStationsRequest {
    query: string;
    latitude?: number;
    longitude?: number;
    limit?: number;
}
//# sourceMappingURL=station.d.ts.map