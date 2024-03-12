import { JwtTokenApi } from "../api/JwtTokenApi";

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const removeAccessToken = (): void => {
  return localStorage.removeItem("accessToken");
};

const saveAccessToken = (accessToken: string): void => {
  return localStorage.setItem("accessToken", accessToken);
};

const refreshTokens = async (): Promise<void> => {
  try {
    // удалим access token
    removeAccessToken();

    // отправим запрос на обновление токенов
    const data = await JwtTokenApi.refreshTokens();

    if (data) {
      //сохраним accessToken в localStorage. refresh token автоматически сохраняется в cookies (возможно это дублирование, т.к. в response interceptor тоже сохраняем!)
      saveAccessToken(data.accessToken);
    }
  } catch (error) {
    console.error(error);
  }
};

export const JwtTokenService = {
  getAccessToken,
  removeAccessToken,
  saveAccessToken,
  refreshTokens,
};
