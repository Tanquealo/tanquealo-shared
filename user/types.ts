/**
 * User Types
 * Types for user profiles, reputation, and achievements
 */

// Canonical User entity
export interface User {
  id: string;
  phone_number: string;
  username?: string;

  // Profile
  date_of_birth?: Date;
  profile_completed: boolean;
  profile_photo_url?: string;

  // Trust & Reputation
  trust_score: number;
  total_reports: number;
  accurate_reports: number;
  disputed_reports: number;

  // Activity / Status
  created_at: Date;
  last_active: Date;
  is_banned: boolean;
  ban_reason?: string;
  ban_expires_at?: Date;

  // Extended fields
  helpful_interactions?: number;
  report_streak?: number;
  achievements?: Achievement[];
  level?: number;
  experience?: number;
}

export interface Achievement {
  id: string;
  code: string; // FIRST_REPORT, TRUSTED_REPORTER, etc.
  name: string;
  description: string;
  icon_url?: string;
  unlocked_at: Date;
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
  user_id: string;
  previous_score: number;
  new_score: number;
  change: number;
  reason: string; // "accurate_report", "disputed_report", "helpful_interaction"
  related_report_id?: string;
  created_at: Date;
}

export interface UserStats {
  user_id: string;

  // Reporting stats
  total_reports: number;
  accurate_reports: number;
  disputed_reports: number;
  accuracy_rate: number; // Percentage

  // Interaction stats
  total_interactions: number;
  confirmations: number;
  disputes: number;
  flags: number;

  // Activity stats
  report_streak: number;
  longest_streak: number;
  active_days: number;
  average_reports_per_day: number;

  // Trust stats
  current_trust_score: number;
  highest_trust_score: number;
  lowest_trust_score: number;

  // Achievements
  achievements_count: number;
  level: number;
  experience: number;
}

// Request/Response Types
export interface UpdateProfileRequest {
  username?: string;
  date_of_birth?: Date;
  profile_photo_url?: string;
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
  user_id: string;
  username?: string;
  profile_photo_url?: string;
  rank: number;
  score: number; // Trust score, report count, or interaction count
  change: number; // Change from previous period
}

export interface GetLeaderboardResponse {
  entries: LeaderboardEntry[];
  user_rank?: LeaderboardEntry; // Current user's position
  period: string;
  metric: string;
}
