// Authentication Models
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  refresh_token_expiration: number;
  user: {
    id: number;
    email: string;
    roles: string[];
    enabled: boolean;
  };
  profile: {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    department: string;
    fileNumber: string;
    transactionId: string;
    thrif: number;
    specialSavings: number;
    status: number;
    date: string;
  };
}

export interface SignUpRequest {
  email: string;
}

export interface SignUpResponse {
  message: string;
  user: {
    id: number;
    email: string;
  };
  credentials?: {
    defaultPassword: string;
    passwordResetToken: string;
    passwordResetUrl: string;
    expiresAt: string;
  };
}

export interface PasswordUpdateRequest {
  token: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface PasswordUpdateResponse {
  message: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  token: string;
  refresh_token: string;
  refresh_token_expiration: number;
}

