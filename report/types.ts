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
  stationId: string;
  reporterId: string;
  reportType: ReportType;
  status: ReportStatus;

  // Status details
  stationStatus?: string; // OPEN, CLOSED, QUEUE, NO_FUEL
  availableFuels?: string[]; // Array of fuel types
  queueLength?: number; // Number of vehicles
  estimatedWaitMinutes?: number;

  // Metadata
  latitude: number;
  longitude: number;
  accuracy?: number; // GPS accuracy in meters
  reportedAt: Date;
  expiresAt: Date;

  // Trust & Consensus
  confirmations: number;
  disputes: number;
  confidenceScore: number; // 0-100
  reporterTrustScore: number; // Reporter's trust at time of report

  // Photos (optional)
  photoUrls?: string[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportInteraction {
  id: string;
  reportId: string;
  userId: string;
  interactionType: InteractionType;
  userTrustScore: number; // User's trust at time of interaction
  weight: number; // How much this interaction counts (based on trust)
  createdAt: Date;
}

export interface AggregatedStationStatus {
  stationId: string;
  status: string;
  availableFuels: string[];
  queueLength: number | null;
  lastUpdated: Date;
  reportCount: number;
  confidenceScore: number;
  averageReporterTrust: number;
}

// Request/Response Types
export interface CreateReportRequest {
  stationId: string;
  reportType: ReportType;
  stationStatus?: string;
  availableFuels?: string[];
  queueLength?: number;
  estimatedWaitMinutes?: number;
  latitude: number;
  longitude: number;
  accuracy?: number;
  photoUrls?: string[];
}

export interface CreateReportResponse {
  report: StatusReport;
  message: string;
}

export interface InteractWithReportRequest {
  interactionType: InteractionType;
}

export interface InteractWithReportResponse {
  report: StatusReport;
  interaction: ReportInteraction;
  message: string;
}

export interface GetReportsQuery {
  stationId?: string;
  reporterId?: string;
  status?: ReportStatus;
  reportType?: ReportType;
  limit?: number;
  offset?: number;
}

export interface GetReportsResponse {
  reports: StatusReport[];
  total: number;
  limit: number;
  offset: number;
}
