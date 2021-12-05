export interface User {
  id: string;
  email: string;
}

export interface SupabaseAuthToken {
  expiresAt: Number;
  currentSession: {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: object;
  };
}
