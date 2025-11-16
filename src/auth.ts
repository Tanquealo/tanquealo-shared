// Authentication Types
export interface User {
  id: string;
  phoneNumber: string;
  username?: string;
  trustScore: number;
  totalReports: number;
  accurateReports: number;
  disputedReports: number;
  createdAt: Date;
  lastActive: Date;
  isBanned: boolean;
}

export interface RegisterRequest {
  phoneNumber: string;
  username?: string;
}

export interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

export interface LoginRequest {
  phoneNumber: string;
  code: string;
}

export interface AuthResponse {
  user: Omit<User, 'createdAt' | 'lastActive'>;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  phoneNumber: string;
  trustScore: number;
}
