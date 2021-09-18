export interface GetTokenRequest {
  email: string,
  password: string
}

export interface GetTokenResponse {
  access: string,
  refresh: string
}

export interface RefreshTokenRequest {
  refresh: string
}
