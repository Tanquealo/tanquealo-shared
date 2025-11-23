/**
 * Auth Types
 * Types for authentication, authorization, and user sessions
 */

import { User } from '../user/types';

// Enums
export enum UserRole {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export enum Permission {
  // Report permissions
  CREATE_REPORT = 'CREATE_REPORT',
  VIEW_REPORTS = 'VIEW_REPORTS',
  INTERACT_WITH_REPORT = 'INTERACT_WITH_REPORT',

  // Station permissions
  CREATE_STATION = 'CREATE_STATION',
  UPDATE_STATION = 'UPDATE_STATION',
  DELETE_STATION = 'DELETE_STATION',

  // User permissions
  VIEW_PROFILE = 'VIEW_PROFILE',
  UPDATE_PROFILE = 'UPDATE_PROFILE',

  // Moderation permissions
  FLAG_CONTENT = 'FLAG_CONTENT',
  REVIEW_FLAGS = 'REVIEW_FLAGS',
  BAN_USER = 'BAN_USER',
  UNBAN_USER = 'UNBAN_USER',

  // Admin permissions
  MANAGE_MODERATORS = 'MANAGE_MODERATORS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  MANAGE_SYSTEM_SETTINGS = 'MANAGE_SYSTEM_SETTINGS',
}

export interface JWTPayload {
  user_id: string;
  phone_number: string;
  role: UserRole;
  trust_score: number;
  iat?: number; // Issued at
  exp?: number; // Expiry
}

export interface AuthResponse {
  user: Pick<
    User,
    | 'id'
    | 'phone_number'
    | 'username'
    | 'trust_score'
    | 'total_reports'
    | 'accurate_reports'
    | 'disputed_reports'
    | 'is_banned'
    | 'date_of_birth'
    | 'profile_completed'
    | 'profile_photo_url'
  > & { role: UserRole };
  access_token: string;
  refresh_token: string;
}

// Request/Response Types
export interface RegisterRequest {
  phone_number: string;
  username?: string;
}

export interface VerifyCodeRequest {
  phone_number: string;
  code: string;
}

export interface LoginRequest {
  phone_number: string;
  code: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RegisterResponse {
  message: string;
  phone_number: string;
}

export interface VerifyCodeResponse extends AuthResponse {}

export interface LoginResponse extends AuthResponse {}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface CheckUsernameRequest {
  username: string;
}

export interface CheckUsernameResponse {
  available: boolean;
  suggestions?: string[];
}

// Role-based Access Control
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    Permission.CREATE_REPORT,
    Permission.VIEW_REPORTS,
    Permission.INTERACT_WITH_REPORT,
    Permission.CREATE_STATION,
    Permission.VIEW_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.FLAG_CONTENT,
  ],
  [UserRole.MODERATOR]: [
    // All user permissions
    Permission.CREATE_REPORT,
    Permission.VIEW_REPORTS,
    Permission.INTERACT_WITH_REPORT,
    Permission.CREATE_STATION,
    Permission.VIEW_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.FLAG_CONTENT,
    // Plus moderator-specific
    Permission.REVIEW_FLAGS,
    Permission.BAN_USER,
    Permission.UNBAN_USER,
    Permission.DELETE_STATION,
    Permission.UPDATE_STATION,
  ],
  [UserRole.ADMIN]: [
    // All moderator permissions
    Permission.CREATE_REPORT,
    Permission.VIEW_REPORTS,
    Permission.INTERACT_WITH_REPORT,
    Permission.CREATE_STATION,
    Permission.VIEW_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.FLAG_CONTENT,
    Permission.REVIEW_FLAGS,
    Permission.BAN_USER,
    Permission.UNBAN_USER,
    Permission.DELETE_STATION,
    Permission.UPDATE_STATION,
    // Plus admin-specific
    Permission.MANAGE_MODERATORS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SYSTEM_SETTINGS,
  ],
};

// Helper function types
export type HasPermission = (user: User, permission: Permission) => boolean;
export type HasRole = (user: User, role: UserRole) => boolean;
