/**
 * User Types
 * Types for user profiles, reputation, and achievements
 */

// Canonical User entity
export interface User {
  id: string;
  phoneNumber: string;
  username?: string;
  avatar?: string;

  // Trust & Reputation
  trustScore: number;
  totalReports: number;
  accurateReports: number;
  disputedReports: number;

  // Activity / Status
  createdAt: Date;
  lastActive: Date;
  isBanned: boolean;
  banReason?: string;
  banExpiresAt?: Date;

  // Extended fields
  helpfulInteractions?: number;
  reportStreak?: number;
  achievements?: Achievement[];
  level?: number;
  experience?: number;
}

export interface Achievement {
  id: string;
  code: string; // FIRST_REPORT, TRUSTED_REPORTER, etc.
  name: string;
  description: string;
  iconUrl?: string;
  unlockedAt: Date;
}

export enum AchievementCode {
  FIRST_REPORT = 'FIRST_REPORT',
  TEN_REPORTS = 'TEN_REPORTS',
  HUNDRED_REPORTS = 'HUNDRED_REPORTS',
  WEEK_STREAK = 'WEEK_STREAK',
  MONTH_STREAK = 'MONTH_STREAK',
  TRUSTED_REPORTER = 'TRUSTED_REPORTER', // Trust score >= 75
  EXPERT_REPORTER = 'EXPERT_REPORTER', // Trust score >= 90
  HELPFUL_CITIZEN = 'HELPFUL_CITIZEN', // 50+ helpful interactions
  EARLY_ADOPTER = 'EARLY_ADOPTER',
}

export interface TrustScoreHistory {
  id: string;
  userId: string;
  previousScore: number;
  newScore: number;
  change: number;
  reason: string; // "accurate_report", "disputed_report", "helpful_interaction"
  relatedReportId?: string;
  createdAt: Date;
}

export interface UserStats {
  userId: string;

  // Reporting stats
  totalReports: number;
  accurateReports: number;
  disputedReports: number;
  accuracyRate: number; // Percentage

  // Interaction stats
  totalInteractions: number;
  confirmations: number;
  disputes: number;
  flags: number;

  // Activity stats
  reportStreak: number;
  longestStreak: number;
  activeDays: number;
  averageReportsPerDay: number;

  // Trust stats
  currentTrustScore: number;
  highestTrustScore: number;
  lowestTrustScore: number;

  // Achievements
  achievementsCount: number;
  level: number;
  experience: number;
}

// Request/Response Types
export interface UpdateProfileRequest {
  username?: string;
  avatar?: string;
}

export interface UpdateProfileResponse {
  user: User;
  message: string;
}

export interface GetUserStatsResponse {
  stats: UserStats;
}

export interface GetLeaderboardQuery {
  period: 'week' | 'month' | 'all-time';
  metric: 'trust-score' | 'reports' | 'helpful';
  limit?: number;
}

export interface LeaderboardEntry {
  userId: string;
  username?: string;
  avatar?: string;
  rank: number;
  score: number; // Trust score, report count, or interaction count
  change: number; // Change from previous period
}

export interface GetLeaderboardResponse {
  entries: LeaderboardEntry[];
  userRank?: LeaderboardEntry; // Current user's position
  period: string;
  metric: string;
}
