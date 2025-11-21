/**
 * Report Types
 * Types for gas station status reports
 */

// Enums
export enum ReportType {
  STATUS_UPDATE = 'STATUS_UPDATE',
  FUEL_AVAILABILITY = 'FUEL_AVAILABILITY',
  QUEUE_LENGTH = 'QUEUE_LENGTH',
  PRICE_UPDATE = 'PRICE_UPDATE',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DISPUTED = 'DISPUTED',
  EXPIRED = 'EXPIRED',
}

export enum InteractionType {
  CONFIRM = 'CONFIRM',
  DISPUTE = 'DISPUTE',
  FLAG = 'FLAG',
}

// Core Types
export interface StatusReport {
  id: string;
  station_id: string;
  reporter_id: string;
  report_type: ReportType;
  status: ReportStatus;

  // Status details
  station_status?: string; // OPEN, CLOSED, QUEUE, NO_FUEL
  available_fuels?: string[]; // Array of fuel types
  queue_length?: number; // Number of vehicles
  estimated_wait_minutes?: number;

  // Metadata
  latitude: number;
  longitude: number;
  accuracy?: number; // GPS accuracy in meters
  reported_at: Date;
  expires_at: Date;

  // Trust & Consensus
  confirmations: number;
  disputes: number;
  confidence_score: number; // 0-100
  reporter_trust_score: number; // Reporter's trust at time of report

  // Photos (optional)
  photo_urls?: string[];

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

export interface ReportInteraction {
  id: string;
  report_id: string;
  user_id: string;
  interaction_type: InteractionType;
  user_trust_score: number; // User's trust at time of interaction
  weight: number; // How much this interaction counts (based on trust)
  created_at: Date;
}

export interface AggregatedStationStatus {
  station_id: string;
  status: string;
  available_fuels: string[];
  queue_length: number | null;
  last_updated: Date;
  report_count: number;
  confidence_score: number;
  average_reporter_trust: number;
}

// Request/Response Types
export interface CreateReportRequest {
  station_id: string;
  report_type: ReportType;
  station_status?: string;
  available_fuels?: string[];
  queue_length?: number;
  estimated_wait_minutes?: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
  photo_urls?: string[];
}

export interface CreateReportResponse {
  report: StatusReport;
  message: string;
}

export interface InteractWithReportRequest {
  interaction_type: InteractionType;
}

export interface InteractWithReportResponse {
  report: StatusReport;
  interaction: ReportInteraction;
  message: string;
}

export interface GetReportsQuery {
  station_id?: string;
  reporter_id?: string;
  status?: ReportStatus;
  report_type?: ReportType;
  limit?: number;
  offset?: number;
}

export interface GetReportsResponse {
  reports: StatusReport[];
  total: number;
  limit: number;
  offset: number;
}
