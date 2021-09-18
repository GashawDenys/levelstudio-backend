export interface GetTokenRequest {
  email: string,
  password: string
}

export interface RefreshTokenRequest {
  refresh: string
}
