import { httpClient } from "../httpClient";

interface IRefreshTokensResponse {
  accessToken: string;
}

async function refreshTokens(): Promise<IRefreshTokensResponse | undefined> {
  try {
    const response = await httpClient.post<IRefreshTokensResponse>(
      "/refreshTokens"
    );
    return response.data;
  } catch (error) {
    console.error("Tokens refresh error", error);
  }
}

export const JwtTokenApi = {
  refreshTokens,
};
